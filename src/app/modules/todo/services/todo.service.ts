import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, filter, raceWith } from 'rxjs';
import { TodoTask } from '../interfaces/TodoTask';
import { DialogResult } from '../interfaces/dialog-result';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public userDocumentRef = this.angularFirestore
    .collection('todos')
    .doc(this.authService.userData.uid);

  public $todos = this.userDocumentRef.collection<TodoTask>('to-do');

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {}

  addToDo(result: DialogResult): void {
    this.userDocumentRef.collection('to-do').add(result.task);
  }

  changeToDo(task: TodoTask): void {
    this.userDocumentRef.collection('to-do').doc(task.id).update(task);
  }

  deleteToDo(task: TodoTask): void {
    this.userDocumentRef.collection('to-do').doc(task.id).delete();
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
