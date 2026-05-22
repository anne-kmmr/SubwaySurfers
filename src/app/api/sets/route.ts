import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

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

    const sets = result.map((row) => ({
      id: row.title,
      title: row.title,
      color: "#845ef7",
      count: Number(row.count),
    }));

    return NextResponse.json(sets);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Sets" },
      { status: 500 }
    );
  }
}