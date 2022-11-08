import { openDB } from '../../database/db';

type ProductRequest = {
  id: string,
  name?: string;
  price?: number;
  quantity?: number;
  code?: number;
  user_id: number;
}

export async function updateProduct(data: ProductRequest): Promise<string> {

  const {
    id,
    name,
    price,
    quantity,
    code,
    user_id
  } = data

  const db = await openDB()

  const isProduct = await db.get('SELECT * FROM products WHERE id=?', [id])

  if(!isProduct){
    throw new Error(`Resource not found`)
  }

  await db.run('UPDATE products SET name=?, price=?, quantity=?, code=? WHERE id=? AND id_user=?', [
    name || isProduct.name,
    price || isProduct.price,
    quantity || isProduct.quantity,
    code || isProduct.code,
    id,
    user_id
  ])
  
  return 'Product updated'
}