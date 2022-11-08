import { openDB } from '../../database/db';

export async function deleteProduct(id: string, user_id: number): Promise<string> {
  const db = await openDB()

  if(!id){
    throw new Error('Resource not found')
  }

  const product = await db.get('SELECT * FROM products WHERE id=?', [id])

  if(!product){
    throw new Error('Product already removed')
  }

  await db.get('DELETE FROM products WHERE id=? AND user_id=?', [id, user_id])

  return 'Product deleted'
}