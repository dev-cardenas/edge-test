import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDB() {
  const databaseName = process.env.NODE_ENV || "development";

  // This is not a good practice, I know, it's just for testing
  return open({
    filename: `./src/database/${databaseName}.db`,
    driver: sqlite3.Database,
  });
}
