import BrowserUtil from '@src/lib/browser';
import Action from '@src/service/action/action';
import ActionScriptLoader from '@src/service/action/script-loader';
import { database } from '@src/service/database';
import { Request, Response } from 'express';
import { request } from 'playwright';

export const runSingleAction = async (req: Request, res: Response) => {
  try {
    const actionScript = new ActionScriptLoader();
    const action = new Action();

    const requestBody = req.body;

    const repeatAction = requestBody['repeat']
      ? requestBody['repeat']
      : actionScript.loadScript({ project: requestBody['project'], actionName: requestBody['actionName'] })[0]['repeat'];

    for (let i = 0; i < repeatAction; i++) {
      if (requestBody['actionType'] === 'UI') {
        const browser = new BrowserUtil();
        const page = await browser.createInstance();
        await action.run(page, { ...requestBody });
        await browser.closeInstance();
      } else if (requestBody['actionType'] === 'API') {
        await action.run(request, { ...requestBody });
      }
    }

    res.status(200).send('Action executed successfully!');
  } catch (error) {
    res.status(400).send({
      message: 'Something went wrong while running action.',
      error: error
    });
  }
};

export const runMultipleAction = async (req: Request, res: Response) => {
  try {
    const requestBody = req.body;
    const actionScript = new ActionScriptLoader();
    const action = new Action();

    for (const _action of requestBody) {
      const project = _action['project'];
      const actionType = _action['actionType'];
      const actionName = _action['actionName'];
      const repeatAction = _action['repeat']
        ? _action['repeat']
        : (actionScript.loadScript({ project: _action['project'], actionName: _action['actionName'] })[0]['repeat'] as any);

      for (let i = 0; i < repeatAction; i++) {
        if (actionType === 'UI') {
          const browser = new BrowserUtil();
          const page = await browser.createInstance();
          await action.run(page, { project, actionName });
          await browser.closeInstance();
        } else if (actionType === 'API') {
          await action.run(request, { project, actionName });
        }
      }
    }

    res.status(200).send('Action(s) executed successfully!');
  } catch (error) {
    res.status(400).send({
      message: 'Something went wrong while running action.',
      error: error
    });
  }
};

export const setActionProjectUrl = async (req: Request, res: Response) => {
  try {
    const { actionProjectBaseUrl } = req.body;

    await database.run(`
      INSERT INTO options (action_project_base_url)
      SELECT 'testvalue'
      WHERE NOT EXISTS (
        SELECT 1 FROM options
      );
    `);

    await database.run(`
      UPDATE options
      SET action_project_base_url = '${actionProjectBaseUrl}'
      WHERE rowid = (SELECT rowid FROM options ORDER BY rowid LIMIT 1);
    `);

    res.status(200).send('Action project base URL updated successfully!');
  } catch (error) {
    res.status(400).send({
      message: 'Something went wrong while updating action project base URL.',
      error: error
    });
  }
};
