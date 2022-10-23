import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TodoTask } from '../../interfaces/TodoTask';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { DialogResult } from '../../interfaces/dialog-result';
import { TodoService } from '../../services/todo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  public $inProgress = this.todoService
    .getSource()
    .pipe(map((data) => data.filter((value) => value.status === 'inProgress')));

  public $done = this.todoService
    .getSource()
    .pipe(map((data) => data.filter((value) => value.status === 'done')));

  public $todo = this.todoService
    .getSource()
    .pipe(map((data) => data.filter((value) => value.status === 'todo')));

  constructor(
    private _dialog: MatDialog,
    private todoService: TodoService,
    private angularFirestore: AngularFirestore
  ) {}

  public addTask(): void {
    const dialogWidnow = this._dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {
          status: 'todo',
        },
      },
    });

    dialogWidnow.afterClosed().subscribe((result: DialogResult) => {
      if (!result) {
        return;
      }
      this.todoService.addToDo(result);
    });
  }

  public editTask(task: TodoTask): void {
    const dialogWidnow = this._dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });

    dialogWidnow.afterClosed().subscribe((result: DialogResult) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.todoService.deleteToDo(task);
      } else {
        this.todoService.changeToDo(task);
      }
    });
  }

  public drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.angularFirestore.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.todoService.userDocumentRef
          .collection('to-do')
          .doc(item.id)
          .update({ status: event.container.id }),
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
