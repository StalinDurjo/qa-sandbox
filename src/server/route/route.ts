import express, { Request, Response } from 'express';
import { runMultipleAction, runSingleAction, setActionProjectUrl } from '../controller/action-controller';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Test Server!');
});

router.post('/run-action', runSingleAction);
router.post('/run-multiple-action', runMultipleAction);
router.post('/set-action-project-url', setActionProjectUrl);

export default router;
