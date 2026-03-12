import { neon } from "@neondatabase/serverless";

// Verbindung zur Neon/Postgres-Datenbank über Environment Variable
export const sql = neon(process.env.DATABASE_URL);