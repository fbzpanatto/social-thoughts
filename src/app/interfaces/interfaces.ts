import { Timestamp } from "@angular/fire/firestore"

export interface User {
  id?: number,
  username: string
}

export interface Thought {
  id?: string,
  textContent: string,
  username: string,
  timestamp: Timestamp,
  like: number
}