import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  firestore = inject(Firestore)

  getUsers() {
    return collectionData(this.usersCollection, { idField: 'id' }) as Observable<User[]>
  }

  get usersCollection() {
    return collection(this.firestore, 'users')
  }
}
