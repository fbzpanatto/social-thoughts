import { Injectable, inject } from '@angular/core';
import { User, Thought } from '../interfaces/interfaces';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private firestore = inject(Firestore)

  getUsers() {
    return collectionData(this.usersCollection, { idField: 'id' }) as Observable<User[]>
  }

  getThoughts() {
    return collectionData(this.thoughtsCollection, { idField: 'id' }) as Observable<Thought[]>
  }

  private get usersCollection() {
    return collection(this.firestore, 'users')
  }

  private get thoughtsCollection(){
    return collection(this.firestore, 'thoughts')
  }
}
