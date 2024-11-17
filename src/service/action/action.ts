import { toFileUrl } from '@src/lib/util/util';
import ActionScriptLoader from './script-loader';
import { actionRegistry } from '@src/service/action/index';
import { database } from '@src/core/database';

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
      const registeredProjectList = actionRegistry.getItems();

      for (const project of registeredProjectList) {
        const _import = await import(toFileUrl(project.directory));
        projectList.push({
          project: project.name,
          properties: _import
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

      return Object.keys(properties).map((key) => properties[key]);
    } catch (error) {
      throw new Error('Something went wrong while returning project actions steps as list \n' + error);
    }
  }

  async run(_object: unknown, config: any) {
    const [actions] = this.actionScriptLoader.loadScript({ project: config['project'], actionName: config['actionName'] });

    for (const actionStep of actions.actionSteps) {
      const action = (await this.loadStepMethods({ project: config['project'] })).find((data) => this.getStepName(data) === actionStep);

      if (this.getStepName(action) === actionStep) {
        const [parameterObject] = this.actionScriptLoader
          .loadParameter()
          .filter((obj) => obj._function === actionStep && obj.project === config['project'] && obj.actionName === config['actionName']);

        const parameters = { ...parameterObject.parameter };

        for (const key in config) {
          if (key in parameters) {
            parameters[key] = config[key];
          }
        }

        const baseUrl = await this.actionProjectBaseUrl();
        const actionType = config['actionType'];

        if (actionType === 'UI') {
          await action({ actionStep, page: _object, scriptParams: { ...parameters, baseUrl } });
        } else if (actionType === 'API') {
          await action({ actionStep, request: _object, scriptParams: { ...parameters, baseUrl } });
        } else {
          await action({ actionStep, obj: _object, scriptParams: { ...parameters, baseUrl } });
        }
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
