import { Request, Response } from 'express';
import { dynamicRouter } from '@src/server/route/dynamic-router';
import Mocker from '../mocker/mocker';
import { randomize } from '@src/lib/util/util';
import { localeSupportList } from '@src/constant';

interface MockerData {
  payload: unknown;
  mocker: Mocker;
}

interface MockerEndpointConfig {
  endpoint: string;
  callback: (data: MockerData) => Promise<unknown>;
}

export default class MockerProject {
  private readonly projectName: string;

  constructor({ projectName }) {
    this.projectName = projectName;
  }

  async addMethod({ endpoint }: { endpoint: string }, callback: (data: MockerData) => Promise<unknown>): Promise<void> {
    dynamicRouter.addRoute('post', `/mocker${this.projectName == 'default' ? '' : '/' + this.projectName}${endpoint}`, async (req: Request, res: Response) => {
      const _locale = req.body;
      const mocker = await new Mocker({ locale: _locale.locale || randomize(localeSupportList) }).initialize();

      try {
        const mockData: MockerData = {
          payload: req.body,
          mocker: mocker
        };

        const result = callback(mockData) || {};

        res.status(200).json({ data: await result });
      } catch (error) {
        console.error(`Error in mock endpoint ${endpoint}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  }
}
