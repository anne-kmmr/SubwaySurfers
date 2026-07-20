import express from 'express';
import cors from "cors";
import setsRouter from './routes/sets';
import vocabRouter from './routes/vocab';
import createCardRouter from './routes/saveCards';
import learningStatus from './routes/learningStatus';

const api = express();
const PORT = 3001;

api.use(cors());
api.use(express.json());

api.use('/sets', setsRouter);
api.use('/vocab', vocabRouter);
api.use('/saveCards', createCardRouter)
api.use('/learningStatus', learningStatus)

api.listen(PORT, () => {

});
