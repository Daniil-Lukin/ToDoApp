import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TodoTask } from '../interfaces/TodoTask';
import { DialogResult } from '../interfaces/dialog-result';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private _store: AngularFirestore) {}

  addToDo(result: DialogResult): void {
    this._store.collection('todo').add(result.task);
  }

  changeToDo(task: TodoTask, list: 'todo' | 'inProgress' | 'done'): void {
    this._store.collection(list).doc(task.id).update(task);
  }

  deleteToDo(task: TodoTask, list: 'todo' | 'inProgress' | 'done'): void {
    this._store.collection(list).doc(task.id).delete();
  }
}
