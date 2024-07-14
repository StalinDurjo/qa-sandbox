import '@testConfig';
import { initServer } from './server/server';
import actionLoader from 'actions/register';
import WorkflowActions from './service/workflow/action';
import WorkflowLoader from './service/workflow/workflow-loader';
import path from 'path';
import BrowserUtil from './lib/browser';
import Workflow from './service/workflow/workflow';

(async function main() {
  // TODO :: Initialize Database

  // start local server
  await initServer();

  const _path = path.join(process.cwd(), 'script');
  console.log(_path);

  // const workflow = new WorkflowLoader('/Users/wedevs/Desktop/sdet/qa-sandbox/script');
  // console.log(workflow.loadFromYaml());

  // const browser = new BrowserUtil();
  // const page = await browser.createInstance();
  // await page.waitForTimeout(5000);
  // await browser.closeInstance();

  const workflow = new Workflow();
  await workflow.executeSingle('', { projectName: 'wordpress', workflowName: 'Set anyone can register' });
})();
