export interface User {
  id?: number,
  username: string,
  password: string
}

export interface Thought {
  id?: number,
  text: string,
  user: User,
  date: Date
}