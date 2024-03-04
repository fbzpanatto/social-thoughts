import { Injectable, inject } from '@angular/core';
import { User, Thought } from '../interfaces/interfaces';
import { Firestore, QueryOrderByConstraint, addDoc, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Observable, from } from 'rxjs';
import { UserInputService } from './user-input.service';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private firestore = inject(Firestore)

  getUsers() {
    return collectionData(this.usersCollection, { idField: 'id' }) as Observable<User[]>
  }
  
  getThoughts() {

    // const q = query(this.thoughtsCollection, where("username", "==", "fbzpanatto"));

    return collectionData(this.thoughtsCollection, { idField: 'id' }) as Observable<Thought[]>
  }

  addThought(thought: Thought): Observable<String> {
    const promise = addDoc(this.thoughtsCollection, thought).then(response => response.id)
    return from(promise)
  }

  updateThought(thoughtId: string, dataToUpdate: {}): Observable<void> {

    const docRef = doc(this.firestore, 'thoughts/' + thoughtId)
    const promise = setDoc(docRef, dataToUpdate)
    return from(promise)
  }

  removeThought(thoughtId: string) {
    const docRef = doc(this.firestore, 'thoughts/' + thoughtId)
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  private get usersCollection() {
    return collection(this.firestore, 'users')
  }

  private get thoughtsCollection() {
    return collection(this.firestore, 'thoughts')
  }
}