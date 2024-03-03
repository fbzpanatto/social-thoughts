import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { User } from '../interfaces/interfaces';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #isAuthenticated = signal(false)
  #uid = signal('')
  #username = signal('')

  firebaseAuth = inject(Auth)

  constructor() { }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {

        this.isAuthenticated = true

        this.uid = response.user.uid
        this.username = response.user.displayName as string

      })
    return from(promise)
  }

  register(user: User): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, user.email, user.password)
      .then(async response => {

        this.isAuthenticated = true
        this.uid = response.user.uid

        await updateProfile(response.user, { displayName: user.username });
        this.username = response.user.displayName as string;
      })

    return from(promise)
  }

  logout(){
    const promise = signOut(this.firebaseAuth)
    return from(promise)
  }

  get uid() { return this.#uid() }

  set uid(value: string) { this.#uid.update(curr => curr = value) }

  get username() { return this.#username() }

  set username(value: string) { this.#username.update(curr => curr = value) }

  get isAuthenticated() { return this.#isAuthenticated() }

  set isAuthenticated(value: boolean) { this.#isAuthenticated.update(curr => curr = value) }
}
