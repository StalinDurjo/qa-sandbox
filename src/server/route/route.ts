import express, { Request, Response } from 'express';
import { runMultipleAction, runSingleAction } from '../controller/action-controller';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Test Server!');
});

router.post('/run-action', runSingleAction);
router.post('/run-multiple-action', runMultipleAction);

export default router;
