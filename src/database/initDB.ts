import { openDB } from './db';

export async function createDBIfNotExist(){
  try { 
    const db = await openDB()
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      );

      CREATE TABLE IF NOT EXISTS products
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER,
        quantity INTEGER,
        code INTEGER,
        id_user INTEGER,
        FOREIGN KEY (id_user) REFERENCES users(id)
      );
    `)

  } catch (e) {
    console.log(e)
    throw new Error(`An error occurred while creating the database`)
  }

}