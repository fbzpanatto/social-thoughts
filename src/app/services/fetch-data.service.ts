import { Injectable, inject } from '@angular/core';
import { User, Thought } from '../interfaces/interfaces';
import { Firestore, QueryOrderByConstraint, addDoc, collectionData, deleteDoc, doc, endAt, limit, orderBy, setDoc, startAfter } from '@angular/fire/firestore';
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

    const q = query(this.thoughtsCollection, orderBy('timestamp', 'desc'))

    return collectionData(q, { idField: 'id' })
      .pipe(
        switchMap((array) => {
          const data = array as Thought[]

          if (search?.charAt(0) === '@') return of(data.filter(el => el.username.toLowerCase().includes(search.slice(1)?.toLowerCase() ?? '')))

          let splitedTerms = search?.split ? search.split(' ') : ['']
          splitedTerms = splitedTerms.map(el => el.toLowerCase())

          return of(data.filter(el => {

            let textContentSplited = el.textContent.replace(/,\s*|\n/g, ' ').trim().split(/\s+/).filter(word => word).map(el => el.toLowerCase())

            return splitedTerms.every(word => textContentSplited.includes(word))

          }))
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