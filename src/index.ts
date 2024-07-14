import '@testConfig';
import { initServer } from './server/server';
import actionLoader from 'actions/register';
import WorkflowActions from './service/workflow/action';
import WorkflowLoader from './service/workflow/workflow-loader';

(async function main() {
  // TODO :: Initialize Database

  // start local server
  await initServer();

  const workflow = new WorkflowLoader('/Users/wedevs/Desktop/sdet/qa-sandbox/script');
  const data = workflow.loadFromYaml();

  // console.log(data);

  // const actions = new WorkflowAction();
  // actions.loadDefinition();
  // actions.loadActions();
  // const loader = actionLoader.load();
  const actions = new WorkflowActions();
  for (const action of await actions.actionList('p1')) {
    console.log(action.name);
    // console.log(typeof action);
    // action.name;
  }
})();
