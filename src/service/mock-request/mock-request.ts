import { Request, Response } from 'express';
import { randomize, toFileUrl } from '@src/lib/util/util';
import { dynamicRouter } from '@src/server/route/dynamic-router';
import { localeSupportList } from '@src/constant';
import { mockRequestRegistry } from '@src/service/mock-request/index';
import Mocker from '@src/core/mocker/mocker';
import logger from '@src/core/logger';

export interface MockerData {
  payload: unknown;
  mocker: Mocker;
}

export default class MockRequest {
  async importAsObjectList(): Promise<any> {
    try {
      const projectList = [];
      const registeredProjectList = mockRequestRegistry.getItems();

      for (const project of registeredProjectList) {
        const _import = await import(toFileUrl(project.directory));

        projectList.push({
          project: project.name,
          properties: Object.values(_import)
        });
      }

      return projectList;
    } catch (error) {
      throw new Error('Something went wrong wh\n' + error);
    }
  }

  getEndpoint(_function) {
    if (typeof _function === 'function') {
      const params = _function.toString().match(/\(([^)]*)\)/)[1];
      const regex = /endpoint=['"`]([^'"`]+)['"`]/;
      return params?.match(regex)?.[1];
    }
  }

  async addMockRoute(endpoint: string, callback: Function) {
    dynamicRouter.addRoute('post', `/mocker${endpoint}`, async (req: Request, res: Response) => {
      const _locale = req.body;
      const mocker = await new Mocker({ locale: _locale.locale || randomize(localeSupportList) }).initialize();

      try {
        const data: MockerData = {
          payload: req.body,
          mocker: mocker
        };

        const result = callback({ endpoint, data }) || {};

        res.status(200).json({ data: await result });
      } catch (error) {
        console.error(`Error in mock endpoint ${'endpoint'}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  }

  async initializeRoutes() {
    const projects = await this.importAsObjectList();

    for (const project of projects) {
      for (const method of project['properties']) {
        if (typeof method === 'function') {
          const endpoint = this.getEndpoint(method);
          const projectSpecificEndpoint = project['project'] === 'default' ? endpoint : `/${project['project']}${endpoint}`;

          await this.addMockRoute(projectSpecificEndpoint, method);
        }
      }
    }
    logger.info('Mock Request Dynamic Router Initialized.');
  }
}
