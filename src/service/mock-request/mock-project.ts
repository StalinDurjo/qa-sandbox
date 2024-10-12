import { Request, Response } from 'express';
import { routeManager } from '@src/server/route/route-manager';
import Mocker from '../mocker/mocker';

export default class MockProject {
  private projectName: string;

  constructor({ projectName }) {
    this.projectName = projectName;
  }

  async add({ endpoint, locale, callback }) {
    routeManager.addDynamicRoute('post', `/mocker/${this.projectName}${endpoint}`, async (req: Request, res: Response) => {
      const mocker = await new Mocker({ locale }).initialize();

      try {
        const _data = {};
        const payload = req.body;

        _data['payload'] = payload;
        _data['mocker'] = mocker;

        const data = callback(_data) || {};

        res.status(200).send({ data });
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }
}
