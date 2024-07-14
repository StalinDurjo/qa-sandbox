import ActionLoader from './action-loader';
import ActionScriptLoader from './script-loader';

export default class Action {
  private actionLoader: ActionLoader;
  private actionScriptLoader: ActionScriptLoader;

  constructor() {
    this.actionLoader = new ActionLoader();
    this.actionScriptLoader = new ActionScriptLoader();
  }

  async runSingle(_object: unknown, { projectName, actionName }) {
    try {
      const [actions] = this.actionScriptLoader.loadScript({ projectName, actionName });

      for (let i = 0; i < actions.repeat; i++) {
        for (const actionStep of actions['actionSteps']) {
          const action = (await this.actionLoader.loadActionList({ project: projectName })).find((data) => data.name === actionStep);

          if (!action?.name) {
            throw new Error(`Action method is not available for step: '${actionStep}' in project: '${projectName}'`);
          }

          if (action?.name === actionStep) {
            await action(_object);
          }
        }
      }
    } catch (error) {
      throw new Error('Failed to run single action \n' + error);
    }
  }
}
