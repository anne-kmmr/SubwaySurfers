// Datei von Anne
// API zum Holen der Vokabeln aus der DB, welche im Ordner "Lib" sowie in ".env.local" definiert ist

import { sql } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "0"); // 0 = alle

    const vocab = await sql`
      SELECT * FROM vocabulary
                      ${limit > 0 ? sql`LIMIT ${limit}` : sql``}
      ORDER BY RANDOM()
    `;

    return new Response(JSON.stringify(vocab), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "DB Error" }), { status: 500 });
  }
}