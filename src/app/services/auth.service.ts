import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { User } from '../interfaces/interfaces';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #isAuthenticated = signal(false)

  firebaseAuth = inject(Auth)

  constructor() { }

  register(user: User): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, user.email, user.password)
      .then(response => updateProfile(response.user, { displayName: user.username }))

    return from(promise)
  }

  get isAuthenticated(): boolean {
    return this.#isAuthenticated()
  }

  set isAuthenticated(value: boolean) {
    this.#isAuthenticated.update(curr => curr = value)
  }
}
