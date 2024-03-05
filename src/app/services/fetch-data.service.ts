import { Injectable, inject } from '@angular/core';
import { User, Thought } from '../interfaces/interfaces';
import { Firestore, addDoc, collectionData, deleteDoc, doc, orderBy, setDoc } from '@angular/fire/firestore';
import { collection, query } from "firebase/firestore";
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private firestore = inject(Firestore)
  private utils = inject(Utils)

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

          let splitedTerms = this.utils.returnLongStringAsArray(search ?? '')

          return of(data.filter(el => {

            let textContentSplited = this.utils.returnLongStringAsArray(el.textContent)

            let condition = splitedTerms?.every(word => textContentSplited.includes(word))

            if (!condition) { return !!textContentSplited.filter(el => { return el.search(`${search}`) !== -1 ? true : false })?.length }

            return condition

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