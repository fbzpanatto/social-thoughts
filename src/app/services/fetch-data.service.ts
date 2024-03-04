import { Injectable, inject } from '@angular/core';
import { User, Thought } from '../interfaces/interfaces';
import { Firestore, QueryOrderByConstraint, addDoc, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { collection, query, where, getDocs, startAt } from "firebase/firestore";
import { Observable, from, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private firestore = inject(Firestore)

  getUsers() {
    return collectionData(this.usersCollection, { idField: 'id' }) as Observable<User[]>
  }

  getThoughts(search: string | null) {

    // return collectionData(this.thoughtsCollection, { idField: 'id' }) as Observable<Thought[]>

    return collectionData(this.thoughtsCollection, { idField: 'id' })
      .pipe(
        switchMap((array) => {
          const data = array as Thought[]

          if (search?.charAt(0) === '@') return of(data.filter(el => el.username.toLowerCase().includes(search.slice(1)?.toLowerCase() ?? '')))
          return of(data.filter(el => el.textContent.toLowerCase().includes(search?.toLowerCase() ?? '')))

        })
      ) as Observable<Thought[]>
  }

  addThought(thought: Thought): Observable<String> {
    return from(addDoc(this.thoughtsCollection, thought).then(response => response.id))
  }

  updateThought(thoughtId: string, dataToUpdate: {}): Observable<void> {
    return from(setDoc(doc(this.firestore, 'thoughts/' + thoughtId), dataToUpdate))
  }

  removeThought(thoughtId: string) {
    return from(deleteDoc(doc(this.firestore, 'thoughts/' + thoughtId)))
  }

  private get usersCollection() { return collection(this.firestore, 'users') }

  private get thoughtsCollection() { return collection(this.firestore, 'thoughts') }
}