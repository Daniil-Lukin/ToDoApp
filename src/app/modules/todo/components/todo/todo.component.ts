import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TodoTask } from '../../interfaces/TodoTask';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { DialogResult } from '../../interfaces/dialog-result';
import { TodoService } from '../../services/todo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  public $todo = this._store.collection('todo').valueChanges({ idField: 'id' });

  public $inProgress = this._store
    .collection('inProgress')
    .valueChanges({ idField: 'id' });

  public $done = this._store.collection('done').valueChanges({ idField: 'id' });

  constructor(
    private _dialog: MatDialog,
    private _service: TodoService,
    private _store: AngularFirestore
  ) {}

  public addTask(): void {
    const dialogWidnow = this._dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });

    dialogWidnow.afterClosed().subscribe((result: DialogResult) => {
      if (!result) {
        return;
      }
      this._service.addToDo(result);
    });
  }

  public editTask(list: 'todo' | 'inProgress' | 'done', task: TodoTask): void {
    const dialogWidnow = this._dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelet: true,
      },
    });

    dialogWidnow.afterClosed().subscribe((result: DialogResult) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this._service.deleteToDo(task, list);
      } else {
        this._service.changeToDo(task, list);
      }
    });
  }

  public drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this._store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this._store
          .collection(event.previousContainer.id)
          .doc(item.id)
          .delete(),
        this._store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
