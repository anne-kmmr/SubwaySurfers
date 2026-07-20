import db from '../../lib/db';
import express from 'express';
import cards from '../../lib/schema';
import { eq, sql } from 'drizzle-orm';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const set = req.query.set as string;

        const result = await db
        .select({
            learning: sql<number>`
            COUNT(*) FILTER (WHERE status = 'learning')
            `,
            inProgress: sql<number>`
            COUNT(*) FILTER (WHERE status = 'inProgress')
            `,
            learned: sql<number>`
            COUNT(*) FILTER (WHERE status = 'learned')
            `,
            
        })
        .from(cards)
        .where(eq(cards.set, set));

        return res.json(result[0]);

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            error: 'failed to load lerningStatus',
        });
    }

})

export default router;