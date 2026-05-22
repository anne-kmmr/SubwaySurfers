// Datei von Anne
// API zum Holen der Vokabeln aus der DB, welche im Ordner "Lib" sowie in ".env.local" definiert ist

import { sql } from "@/lib/db";

// Sucht Vokabeln aus der DB und gibt diese aktuell random aus
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "0"); // 0 = alle

    const vocab = await sql`
      SELECT * FROM vocabulary
                      ${limit > 0 ? sql`LIMIT ${limit}` : sql``}
      ORDER BY RANDOM()
    `;

    // JSON-Response und Fehlerbehandlung
    return new Response(JSON.stringify(vocab), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "DB Error" }), { status: 500 });
  }
}