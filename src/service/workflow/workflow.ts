import { Page } from 'playwright';
import WorkflowLoader from './workflow-loader';
import ActionLoader from './action-loader';

interface WorkflowInterface {
  project: string;
  workflow_name: string;
  repeat: number;
  task_list: string[];
}

export default class Workflow {
  private workflowLoader: WorkflowLoader;

  constructor() {
    this.workflowLoader = new WorkflowLoader('/Users/wedevs/Desktop/sdet/qa-sandbox/script');
  }

  private filterByProject({ projectName, workflowList }: { projectName: string; workflowList: WorkflowInterface[] }) {
    return workflowList.filter((data) => data.project === projectName);
  }

  private filterByName({ workflowName, workflowList }: { workflowName: string; workflowList: WorkflowInterface[] }) {
    return workflowList.filter((data) => data.workflow_name === workflowName);
  }

  private filterByProjectAndName({ projectName, workflowName }) {
    const allWorkflow = this.workflowLoader.loadFromYaml();
    const workflowByProject = this.filterByProject({ projectName, workflowList: allWorkflow });
    return this.filterByName({ workflowName, workflowList: workflowByProject });
  }

  async executeSingle(page: any, { projectName, workflowName }) {
    const [workflow] = this.filterByProjectAndName({ projectName, workflowName });
    const actionLoader = new ActionLoader();
    console.log(await actionLoader.load());

    for (let i = 0; i < workflow.repeat; i++) {
      for (const task of workflow['task_list']) {
        // console.log(task);
      }
    }
  }
}
