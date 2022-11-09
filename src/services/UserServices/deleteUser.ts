import { openDB } from "../../database/db";

type UserRequest = {
  email: string;
};

export async function deleteUser(data: UserRequest): Promise<string> {
  const { email } = data;

  const db = await openDB();
  const user = await db.get("SELECT * FROM users WHERE email=?", [email]);

  if (user) {
    const products = await db.all("SELECT * FROM products WHERE id_user=?", [
      user.id,
    ]);

    if (products.length > 0) {
      await db.run("DELETE FROM products WHERE id_user=?", [user.id]);
    }

    await db.run("DELETE FROM users WHERE email=?", [email]);

    return "User removed";
  }

  return "User not found";
}
