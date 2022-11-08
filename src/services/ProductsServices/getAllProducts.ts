import { openDB } from '../../database/db';

type ProductsResponse = {
  id: number,
  name: string;
  price: number;
  quantity: number;
  code: number;
}

export async function getAllProducts(user_id: number): Promise<ProductsResponse[]> {
  const db = await openDB()
  return await db.all('SELECT * FROM products WHERE id_user=?', [user_id])
}