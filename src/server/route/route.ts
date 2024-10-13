import express, { Request, Response } from 'express';
import { runSingleAction } from '../controller/action-controller';
import { generateMockData } from '../controller/mocker-controller';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Test Server!');
});

router.post('/run-action', runSingleAction);

// mocker routers
router.post('/mocker/generate', generateMockData);

export default router;
