import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable, filter, raceWith } from 'rxjs';
import { TodoTask } from '../interfaces/TodoTask';
import { DialogResult } from '../interfaces/dialog-result';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public userDocumentRef: AngularFirestoreDocument<unknown>;

  public $todos: AngularFirestoreCollection<TodoTask>;

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {}

  setDocument() {
    this.userDocumentRef = this.angularFirestore
      .collection('todos')
      .doc(this.authService.getUid());

    this.$todos = this.userDocumentRef.collection<TodoTask>('to-do');
  }

  addToDo(result: DialogResult): void {
    this.$todos.add(result.task);
  }

  changeToDo(task: TodoTask): void {
    this.$todos.doc(task.id).update(task);
  }

  deleteToDo(task: TodoTask): void {
    this.$todos.doc(task.id).delete();
  }

  getSource() {
    return this.$todos.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as TodoTask;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
