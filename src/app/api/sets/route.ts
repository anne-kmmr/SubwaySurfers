// Datei von Anne
// API, welche die sets und damit verbundenen Vokablen aus der Datenbank holt und daraus die Startseite baut

import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Holt die Daten aus der DB
export async function GET() {
  try {
    const result = await sql`
      SELECT
        "set" AS title,
        COUNT(*) AS count
      FROM vocabulary
      GROUP BY "set"
      ORDER BY "set"
    `;

    // Mapt alle Ergebnisse zusammen, um so die einzelnen Einträge für die Home-Seite zusammenzutragen
    const sets = result.map((row) => ({
      id: row.title,
      title: row.title,
      color: "#845ef7",
      count: Number(row.count),
    }));

    // Fehlerbehandlung
    return NextResponse.json(sets);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Sets" },
      { status: 500 }
    );
  }
}