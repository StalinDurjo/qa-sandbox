import BrowserUtil from '@src/lib/browser';
import Action from '@src/service/action/action';
import ActionScriptLoader from '@src/service/action/script-loader';
import { database } from 'src/core/database';
import { Request, Response } from 'express';
import { request } from 'playwright';

interface ActionRequest {
  project: string;
  actionName: string;
  actionType?: 'UI' | 'API';
  repeat?: number;
  [key: string]: any;
}

const executeUIAction = async (action: Action, actionConfig: ActionRequest): Promise<void> => {
  const browser = new BrowserUtil();
  try {
    const page = await browser.createInstance({ headless: false });
    await action.run(page, actionConfig);
  } finally {
    await browser.closeInstance();
  }
};

const executeAPIAction = async (action: Action, actionConfig: ActionRequest): Promise<void> => {
  await action.run(request, actionConfig);
};

const executeAction = async (actionConfig: ActionRequest): Promise<void> => {
  const actionScript = new ActionScriptLoader();
  const action = new Action();

  const actionType = actionConfig.actionType || 'UI';
  const script = actionScript.loadScript({
    project: actionConfig.project,
    actionName: actionConfig.actionName
  });

  const repeatCount = actionConfig.repeat ?? script[0].repeat;

  for (let i = 0; i < repeatCount; i++) {
    if (actionType === 'UI') {
      await executeUIAction(action, actionConfig);
    } else if (actionType === 'API') {
      await executeAPIAction(action, actionConfig);
    } else {
      throw new Error(`Unsupported action type: ${actionType}`);
    }
  }
};

export const runSingleAction = async (req: Request, res: Response): Promise<void> => {
  try {
    await executeAction(req.body);
    res.status(200).json({ message: 'Action executed successfully!' });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong while running action.',
      error
    });
  }
};

export const runMultipleAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const actions: ActionRequest[] = req.body;
    for (const action of actions) {
      await executeAction(action);
    }
    res.status(200).json({ message: 'Action(s) executed successfully!' });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong while running actions.',
      error
    });
  }
};

const updateProjectUrl = async (url: string): Promise<void> => {
  const initQuery = `
    INSERT INTO options (action_project_base_url)
    SELECT 'testvalue'
    WHERE NOT EXISTS (SELECT 1 FROM options);
  `;

  const updateQuery = `
    UPDATE options
    SET action_project_base_url = ?
    WHERE rowid = (SELECT rowid FROM options ORDER BY rowid LIMIT 1);
  `;

  await database.run(initQuery);
  await database.run(updateQuery, [url]);
};

export const setActionProjectUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { actionProjectBaseUrl } = req.body;

    if (!actionProjectBaseUrl) {
      throw new Error('Action project base URL is required');
    }

    await updateProjectUrl(actionProjectBaseUrl);
    res.status(200).json({ message: 'Action project base URL set successfully!' });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong while setting Action project base URL.',
      error
    });
  }
};
