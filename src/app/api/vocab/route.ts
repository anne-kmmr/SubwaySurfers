import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// Vokabeln holen via Get
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "0");

    const vocab = await sql`
      SELECT * FROM vocabulary
      ORDER BY RANDOM()
      ${limit > 0 ? sql`LIMIT ${limit}` : sql``}
    `;

    return NextResponse.json(vocab);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}

// Vokabeln löschen via delete
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
          { error: "No id provided" },
          { status: 400 }
      );
    }

    await sql`
      DELETE FROM vocabulary
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
        { error: "Delete failed" },
        { status: 500 }
    );
  }
}