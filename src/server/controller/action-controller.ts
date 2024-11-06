import BrowserUtil from '@src/lib/browser';
import Action from '@src/service/action/action';
import ActionScriptLoader from '@src/service/action/script-loader';
import { Request, Response } from 'express';
import { request } from 'playwright';

export const runSingleAction = async (req: Request, res: Response) => {
  try {
    const { project, actionName, repeat, actionType } = req.body;
    const actionScript = new ActionScriptLoader();
    const action = new Action();

    const repeatAction = repeat ? repeat : actionScript.loadScript({ project, actionName })[0]['repeat'];

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
    const actionList = req.body;
    const actionScript = new ActionScriptLoader();
    const action = new Action();

    for (const _action of actionList) {
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
