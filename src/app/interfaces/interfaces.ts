import { Timestamp } from "@angular/fire/firestore"

export interface User {
  id?: number,
  username?: string,
  email: string,
  password: string,
  liked?: string[]
}

export interface Thought {
  id?: string,
  textContent: string,
  username: string,
  userUid: string,
  timestamp: Timestamp,
  like: number
}