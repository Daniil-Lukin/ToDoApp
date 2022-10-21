import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
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
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(this.userData, {
      merge: true,
    });
  }

  setUser() {
    this.fireAuth.authState.subscribe((user) => {
      console.log(
        'from userStatus: user ' + user + ' userLoggedIn: ' + this.userLoggedIn
      );
      this.userLoggedIn = !!user;
    });
  }

  signIn(email: string, password: string) {
    return this.fireAuth //first value from
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUpFirebaseUser(result.user);
        console.log('from signIn ' + this.userLoggedIn);
        //app initializaer
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.setUpFirebaseUser(user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  resetPassword(email: string) {
    return this.fireAuth
      .sendPasswordResetEmail(email)
      .then(() => window.alert('password reset has been sent, check mailbox'))
      .catch((error) => window.alert(error.message));
  }

  signOut() {
    this.fireAuth.signOut();
  }
}
