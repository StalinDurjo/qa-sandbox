import express, { Request, Response } from 'express';
import route from './route/route';

const app = express();

app.use(route);

const PORT = process.env.PORT || 3000;

export const initServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};
