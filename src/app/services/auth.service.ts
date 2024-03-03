import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #isAuthenticated = signal(false)

  constructor() { }

  get isAuthenticated(): boolean {
    return this.#isAuthenticated()
  }

  set isAuthenticated(value: boolean) {
    this.#isAuthenticated.update(curr => curr = value)
  }
}
