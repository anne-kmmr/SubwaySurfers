// Implementation durch Anne

import { neon } from "@neondatabase/serverless";


// stellt mittels lokalen Variablen aus ".env.local" Verbindung zur DB her und prüft sie
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL ist nicht gesetzt!");
}

export const sql = neon(process.env.DATABASE_URL);