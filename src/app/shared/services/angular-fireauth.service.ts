import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, Subject, Subscription } from 'rxjs';
import { User } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AngularFireauthService {

  user: User = null;

  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log('User login');
      } else {
        this.user = null;
      }
    });
  }

  login(login: string, password: string) {
    this.auth.auth.signInWithEmailAndPassword(login, password)
      .then((result) => {
        console.log('login');
      }).catch((err) => {
        console.log(err);
      });
  }

  signUp(login: string, password: string) {
    this.auth.auth.createUserWithEmailAndPassword(login, password)
      .then((result) => {
        console.log('create user & login');
      }).catch((err) => {
        console.log(err);
      });
  }

  logout() {
    this.auth.auth.signOut();
    console.log('logout');
  }
}
