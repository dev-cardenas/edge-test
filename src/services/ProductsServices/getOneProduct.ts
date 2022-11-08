import { openDB } from '../../database/db';

type ProductsResponse = {
  id: number,
  name: string;
  price: number;
  quantity: number;
  code: number;
}

export async function getOneProduct(id: string, user_id: number): Promise<ProductsResponse> {
  const db = await openDB()

  if(!id){
    throw new Error('Resource not found')
  }

  const product = await db.get('SELECT * FROM products WHERE id=? AND id_user=?', [id, user_id])
  
  if(!product){
    throw new Error('Resource not found')
  }

  return product
}