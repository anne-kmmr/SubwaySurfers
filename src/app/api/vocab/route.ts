import { sql } from "../../../lib/db";

export async function GET() {
  try {
    const vocab = await sql`
      SELECT * FROM vocabulary
      WHERE set = 'Mathe'
      ORDER BY RANDOM()
      LIMIT 1
    `;
    return new Response(JSON.stringify(vocab[0] || null), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "DB Error" }), { status: 500 });
  }
}