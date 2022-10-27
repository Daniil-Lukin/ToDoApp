import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  catchError,
  firstValueFrom,
  from,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: User;
  public userLoggedIn: boolean = false;
  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  setUpFirebaseUser(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    this.setUser(user);
    this.userLoggedIn = true;
    return userRef.set(this.userData, {
      merge: true,
    });
  }

  setUpTodoUser(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `todos/${user.uid}`
    );
    return userRef.set(this.userData, {
      merge: true,
    });
  }

  setUser(user: User) {
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    console.log();
  }

  signIn(email: string, password: string) {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError((error) => of(error)),
      switchMap((result) => {
        this.setUpFirebaseUser(result.user);
        this.setUpTodoUser(result.user);
        return of(true);
      })
    );
  }

  signUp(email: string, password: string) {
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password));
  }

  resetPassword(email: string) {
    return of(this.fireAuth.sendPasswordResetEmail(email));
  }

  signOut() {
    return from(this.fireAuth.signOut());
  }

  getUid() {
    return this.userData.uid;
  }
}
