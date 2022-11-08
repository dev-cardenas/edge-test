import { openDB } from '../../database/db';

type ProductRequest = {
  name: string;
  price: number;
  quantity: number;
  code: number;
  user_id: number;
}

export async function createProduct(data: ProductRequest): Promise<string> {

  const {
    name,
    price,
    quantity,
    code,
    user_id
  } = data

  const db = await openDB()
  const product = await db.get('SELECT * FROM products WHERE name=?', [name])
  
  if(product){
    throw new Error('Product already exists')
  }

  await db.run(
    'INSERT INTO products (name, price, quantity, code, id_user) VALUES (?,?,?,?,?)',
    [
      name,
      price,
      quantity,
      code,
      user_id
    ]
  );

  return 'Product created'
}