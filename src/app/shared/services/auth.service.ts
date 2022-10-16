import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { StatefulService } from './stateful.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    private _auth: AngularFireAuth,
    private _fireApp: AngularFirestore,
    private _router: Router,
    public state: StatefulService
  ) {
    this._auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
      JSON.parse(localStorage.getItem('user')!);
    });
  }

  setUpUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this._fireApp.doc(
      `users/${user.userID}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signIn(email: string, password: string) {
    return this._auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUpUser(result.user),
          this._auth.authState.subscribe((user) => {
            if (user) {
              this.state.changeSignedInState();
              this._router.navigate(['toDo']);
            }
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string) {
    return this._auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUpUser(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  resetPassword(email: string) {
    return this._auth
      .sendPasswordResetEmail(email)
      .then(() => window.alert('password reset has been sent, check mailbox'))
      .catch((error) => window.alert(error.message));
  }

  signOut() {
    this.state.changeSignedInState();
    return this._auth.signOut().then(() => localStorage.removeItem('user'));
  }
}
