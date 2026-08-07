// Idee und Implementierung durch Adam
import db from './../../lib/db';
import express from 'express';
import cards from '../../lib/schema';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const  {
            question,
            answer,
            set,
            status,
        } = req.body;

        const result = await db
        .insert(cards)
        .values({
          question,
          answer,
          set,
          status: status ?? "learning",
        }).returning()

      return res.json(result[0])

    } catch (err) {
        console.log(err);

      return res.status(500).json(
        {
          error: 'create a new Card failed'
        }
    );
    }
}
)

router.patch('/', async (req, res) => {
  try {
      const {
              id,
              question,
              answer,
        } = req.body;

      const result = await db
      .update(cards)
      .set({
        question,
        answer,
      })
      .where(eq(cards.id, id))
      .returning();
        
      return res.json(result[0])

  } catch (err) {
    console.log(err);

      return res.status(500).json(
        {
          error: 'update failed'
        }
    );
  }

})


export default router;


