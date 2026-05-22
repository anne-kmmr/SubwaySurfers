// Datei von Anne
// API, welche den status der Vokabelkarten abfragen oder ändern kann

import { sql } from "@/lib/db";

// Daten holen
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, status } = body;

    const result = await sql`
      UPDATE vocabulary
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *
    `;

    // Auf JSON-Response warten
    return Response.json({
      success: true,
      updated: result,
    });

  //Fehlerbehandlung
  } catch (err) {
    console.error("API ERROR:", err);

    return Response.json(
      {
        error: String(err),
      },
      { status: 500 }
    );
  }
}