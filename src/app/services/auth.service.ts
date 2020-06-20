import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import UserCredential = firebase.auth.UserCredential;
import { AngularFireDatabase } from '@angular/fire/database';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<firebase.User | null> = new Observable<firebase.User | null>();
  public uid: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.user = angularFireAuth.user;
    this.user.subscribe((user) => {
      this.uid = user.uid;
    });
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  signIn(email: string, password: string): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
    return this.angularFireAuth.signOut();
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((uc) => {
        return this.db.database
          .ref('users/' + uc.user.uid)
          .set({ email: uc.user.email })
          .then(() => {
            return uc;
          });
      })
      .then((uc) => {
        return uc.user.sendEmailVerification().then(() => {
          return uc;
        });
      });
  }
}
