import { Timestamp } from "@angular/fire/firestore"

export interface User {
  id?: number,
  username: string
}

export interface Thought {
  id?: number,
  textContent: string,
  username: string,
  timestamp: Timestamp
}