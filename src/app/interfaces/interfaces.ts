export interface User {
  id?: number,
  user: string,
  password: string
}

export interface Thought {
  id?: number,
  text: string,
  user: User,
  date: Date
}