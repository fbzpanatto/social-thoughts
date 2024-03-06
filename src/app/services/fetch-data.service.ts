import { Injectable, inject } from '@angular/core';
import { User, Thought } from '../interfaces/interfaces';
import { Firestore, addDoc, collectionData, deleteDoc, doc, setDoc, where } from '@angular/fire/firestore';
import { collection, query } from "firebase/firestore";
import { Observable, from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private firestore = inject(Firestore)

  getUsers() {
    return collectionData(this.usersCollection, { idField: 'id' }) as Observable<User[]>
  }

  getThoughts(search: string | null) {

    let qArray = [
      where('textContent', '>=', search),
      where('textContent', '<=', search + '\uf8ff')
    ]

    if (search?.charAt(0) === '@') qArray = [where('username', '>=', search.slice(1)?.toLowerCase() ?? '')]

    const q = search ? query(this.thoughtsCollection, ...qArray) : query(this.thoughtsCollection);

    return collectionData(q, { idField: 'id' })
      .pipe(
        switchMap((array) => {
          let data = array as Thought[]
          return of(data.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds))
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