import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET() {
  try {
    // Sets + Anzahl Vokabeln direkt in SQL berechnen
    const result = await pool.query(`
      SELECT
        s.id,
        s.title,
        s.color,
        COUNT(v.id) AS count
      FROM sets s
      LEFT JOIN vocabularies v ON v.set_id = s.id
      GROUP BY s.id
      ORDER BY s.title;
    `);

    const sets = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      color: row.color,
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