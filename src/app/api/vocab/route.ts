import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// -------------------------
// GET → Vokabeln laden
// -------------------------
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const limit = parseInt(
        url.searchParams.get("limit") || "0"
    );

    const set = url.searchParams.get("set");
    const status = url.searchParams.get("status");
    const random = url.searchParams.get("random");

    const vocab = await sql`
      SELECT * FROM vocabulary
      WHERE
        (${set ? sql`"set" = ${set}` : sql`TRUE`})
        AND
        (${status ? sql`status = ${status}` : sql`TRUE`})
      ORDER BY
        ${random ? sql`RANDOM()` : sql`id`}
      ${limit > 0 ? sql`LIMIT ${limit}` : sql``}
    `;

    return NextResponse.json(vocab);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
        { error: "DB Error" },
        { status: 500 }
    );
  }
}

// -------------------------
// POST → Neue Karte erstellen
// -------------------------
export async function POST(req: Request) {
  try {
    const {
      question,
      answer,
      set,
      status,
    } = await req.json();

    const result = await sql`
      INSERT INTO vocabulary (
        question,
        answer,
        "set",
        status
      )
      VALUES (
        ${question},
        ${answer},
        ${set},
        ${status || null}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0]);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
        { error: "Create failed" },
        { status: 500 }
    );
  }
}

// -------------------------
// PUT → Karte bearbeiten
// + Status ändern
// -------------------------
export async function PUT(req: Request) {
  try {
    const {
      id,
      question,
      answer,
      set,
      status,
    } = await req.json();

    const result = await sql`
      UPDATE vocabulary
      SET
        question = COALESCE(${question}, question),
        answer = COALESCE(${answer}, answer),
        "set" = COALESCE(${set}, "set"),
        status = COALESCE(${status}, status)
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
        { error: "Update failed" },
        { status: 500 }
    );
  }
}

// -------------------------
// DELETE → Karte löschen
// -------------------------
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

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
        { error: "Delete failed" },
        { status: 500 }
    );
  }
}