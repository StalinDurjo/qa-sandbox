import { toFileUrl } from '@src/lib/util/util';
import { actionRegistry, ProjectInfo } from './action-registry';
import ActionScriptLoader from './script-loader';

type ActionProjectClassInfo = {
  project: string;
  properties: Object;
};

export default class Action {
  private actionScriptLoader: ActionScriptLoader;

  constructor() {
    this.actionScriptLoader = new ActionScriptLoader();
  }

  private async importAsObjectList(): Promise<ActionProjectClassInfo[]> {
    try {
      const projectList: ActionProjectClassInfo[] = [];
      const registeredProjectList: ProjectInfo[] = actionRegistry.registeredProjects();

      for (const project of registeredProjectList) {
        const _import = await import(toFileUrl(project.directory));
        const _module = _import.default;
        const instance = new _module();
        const properties = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(instance));

        projectList.push({
          project: project.name,
          properties: properties
        });
      }

      return projectList;
    } catch (error) {
      throw new Error('Something went wrong while loading action projects\n' + error);
    }
  }

  async loadActionSteps({ project }: { project: string }) {
    try {
      const actions = (await this.importAsObjectList()).filter((data) => data.project === project);
      const [properties] = actions.map((data) => {
        return data.properties;
      });

      return Object.keys(properties)
        .map((key) => properties[key].value)
        .filter((item) => typeof item === 'function');
    } catch (error) {
      throw new Error('Something went wrong while returning project actions steps as list \n' + error);
    }
  }

  async runAction(_object: unknown, { project, actionName }) {
    const [actions] = this.actionScriptLoader.loadScript({ project, actionName });

    for (const actionStep of actions.actionSteps) {
      const action = (await this.loadActionSteps({ project })).find((data) => data.name === actionStep);

      if (action?.name === actionStep) {
        const [parameterObject] = this.actionScriptLoader.loadParameter().filter((obj) => obj._function === actionStep && obj.project === project && obj.actionName === actionName);

        await action(_object, { ...parameterObject.parameter });
      }
    }
  }
}
