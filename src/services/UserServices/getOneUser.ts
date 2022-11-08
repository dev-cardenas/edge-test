import { openDB } from '../../database/db';

type UserResponse = {
  id: number,
  email: string;
  password: number;
}

export async function getOneUser(email: string): Promise<UserResponse> {
  const db = await openDB()

  if(!email){
    throw new Error('Resource not found')
  }

  const user = await db.get('SELECT * FROM users WHERE email=?', [email])
  
  if(!user){
    throw new Error('Resource not found')
  }

  return user
}