// Idee und Implementierung durch Anne
//spätere Änderungen durch Adam
import db from './../../lib/db';
import express from 'express';
import cards from '../../lib/schema';
import { sql, asc } from "drizzle-orm";

const router = express.Router()

router.get('/', async (req, res) => {
try {
    const result = await db
    .select({
      title: cards.set,
      count: sql<number>`count(*)`,
    })
    .from(cards)
    .groupBy(cards.set)
    .orderBy(asc(cards.set));

    const sets = result.map((row) => ({
    id: row.title,
    title: row.title,
    color: "#845ef7",
    count: Number(row.count),
    }));

    return res.json(sets);
  } catch (error) {
    console.error(error);
    return res.json(
    { error: "Fehler beim Laden der Sets",
        status: 500,
    });
  }
})

export default router;
