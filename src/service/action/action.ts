import { toFileUrl } from '@src/lib/util/util';
import { actionRegistry, ProjectInfo } from './action-registry';
import ActionScriptLoader from './script-loader';
import { database } from '../database';

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

  async loadStepMethods({ project }: { project: string }) {
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

  async run(_object: unknown, param: any) {
    const [actions] = this.actionScriptLoader.loadScript({ project: param['project'], actionName: param['actionName'] });

    for (const actionStep of actions.actionSteps) {
      const action = (await this.loadStepMethods({ project: param['project'] })).find((data) => this.getStepName(data) === actionStep);

      if (this.getStepName(action) === actionStep) {
        const [parameterObject] = this.actionScriptLoader
          .loadParameter()
          .filter((obj) => obj._function === actionStep && obj.project === param['project'] && obj.actionName === param['actionName']);

        const parameters = { ...parameterObject.parameter };

        for (const key in param) {
          if (key in parameters) {
            parameters[key] = param[key];
          }
        }

        await action(null, _object, { ...parameters, baseUrl: await this.actionProjectBaseUrl() });
      }
    }
  }

  private getStepName(actionStep: Function) {
    if (typeof actionStep === 'function') {
      const params = actionStep.toString().match(/\(([^)]*)\)/)[1];
      const regex = /actionStepName=['"`]([^'"`]+)['"`]/;
      return params?.match(regex)?.[1];
    }
  }

  private async actionProjectBaseUrl() {
    const [url] = await database.all(`SELECT action_project_base_url from options`);
    return url['action_project_base_url'];
  }
}
