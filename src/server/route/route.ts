import express, { Request, Response } from 'express';
import { runSingleAction } from '../controller/action-controller';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Test Server!');
});

router.post('/run-action', runSingleAction);

export default router;
