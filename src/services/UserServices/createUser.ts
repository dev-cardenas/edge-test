import { openDB } from '../../database/db';

type UserRequest = {
  email: string;
  password: number;
}

export async function createUser(data: UserRequest): Promise<string> {

  const {
    email,
    password
  } = data

  const db = await openDB()
  const user = await db.get('SELECT * FROM users WHERE email=?', [email])
  
  if(user){
    throw new Error('Email already exists')
  }

  await db.run(
    'INSERT INTO users (email, password) VALUES (?,?)',
    [
      email,
      password
    ]
  );

  return 'User created'
}