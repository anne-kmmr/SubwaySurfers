// Implementation durch Anne
//spätere Änderungen durch Adam

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";


// stellt mittels lokalen Variablen aus ".env.local" Verbindung zur DB her und prüft sie
if (!process.env.DATABASE_URL) {
  const url = console.log(process.env.DATABASE_URL)
  throw new Error(`DATABASE_URL ist nicht gesetzt! Url: ${url}`);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export default db;