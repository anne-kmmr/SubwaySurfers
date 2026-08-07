// Idee und Implementierung durch Anne
//spätere Änderungen durch Adam
import db from './../../lib/db';
import express from 'express';
import cards from '../../lib/schema';
import { and, eq, sql } from 'drizzle-orm';

const router = express.Router();

// GET: Vokabeln laden
router.get('/', async (req, res) => {
    try {
  
    const limit = Number(req.query.limit) || 0;
    const set = req.query.set as string | undefined;
    const status = req.query.status as string | undefined;
    const random = req.query.random as string | undefined;

    let query = db
    .select()
    .from(cards)
    .where(
      and(
        set ? eq(cards.set,set): undefined,
        status ? eq(cards.status, status): undefined,
      )
    )
    .orderBy(random ? sql`Random()`: cards.id);

    

    const vocab =
    limit > 0
    ? await query.limit(limit)
    : await query;

    return res.json(vocab);

  } catch (err) {
    console.error(err);

    return res.json([]);
  }
})

// PUT: Karte bearbeiten + Status ändern
router.put('/', async (req, res) => {
  try {
    const {
      id,
      question,
      answer,
      set,
      status,
    } = req.body;

    const updateData: Partial<typeof cards.$inferInsert> = {}

    if (!id) {
      return res.status(400).json({ error: "id fehlt" });
    };

    if (question !== undefined && answer !== undefined) {
      updateData.question =question;
      updateData.answer = answer;
    };

    if (set !== undefined) {
      updateData.set = set;
    };

    if (status !== undefined) {
      updateData.status = status;
    };

    const result = await db
    .update(cards)
    .set(updateData)
    .where(eq(cards.id, id))
    .returning();

    

    return res.json(result[0]);

  } catch (err) {
    console.error(err);

    return res.status(500).json(
        {
          error: "Update failed"
        }
    );
  }
})

// Delete: Karte löschen
router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json(
          {
            error: "No id provided"
          }
      );
    }

    await db
    .delete(cards)
    .where(eq(cards.id, id));

    return res.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json(
        {
          error: "Delete failed"
        }
    );
  }
});

export default router;
