import Dexie, { type EntityTable } from 'dexie'

export interface Book {
  id: number
  title: string
  author: string
}

export interface Friend {
  id: number
  name: string
  age: number
}

const db = new Dexie('FriendsDatabase') as Dexie & {
  friends: EntityTable<
    Friend,
    'id' // primary key "id" (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  friends: '++id, name, age' // primary key "id" (for the runtime!)
})

export { db }
// export type { Friend }
