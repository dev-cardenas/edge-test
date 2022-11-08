
import { openDB } from '../../database/db';

type ProductsResponse = {
  id: number,
  name: string;
  price: number;
  quantity: number;
  code: number;
}

export async function searchProduct(search: string): Promise<ProductsResponse[]> {
  const db = await openDB()
  return await db.all('SELECT * FROM products WHERE name like ?', [`%${search}%`])
}