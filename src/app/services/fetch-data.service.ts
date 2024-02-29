import { Injectable } from '@angular/core';
import { User, Thought } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor() { }

  getUsers() {

  }

  getUserById(id: number) {

  }

  getUserByName(user: string) {

  }

  getThoughts() {

  }

  createUser(user: string, password: string) {
    const el: User = { user, password }
  }

  createThought(text: string, user: any) {
  }
}
