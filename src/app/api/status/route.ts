import { sql } from "@/lib/db";

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

    return Response.json({
      success: true,
      updated: result,
    });

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