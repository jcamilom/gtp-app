import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  public register(email: string, password: string): Observable<auth.UserCredential> {
    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password));
  }

}
