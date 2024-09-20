import FileLoader from '@src/lib/file-loader';
import { parseYamlToObject } from '@src/lib/util/yaml';
import path from 'path';

type ActionScriptInfo = {
  project: string;
  actionName: string;
  repeat: number;
  actionSteps: string[];
  parameter: any[];
};

type ActionScriptParameter = {
  project: string;
  actionName: string;
  _function: string;
  parameter: unknown[];
};

export default class ActionScriptLoader {
  private fileLoader: FileLoader;
  private prefix = 'action';
  private searchPath: string;

  constructor() {
    this.searchPath = path.join(path.resolve(process.cwd()) + '/actions/script');
    this.fileLoader = new FileLoader({ prefix: this.prefix, searchDirectory: this.searchPath });
  }

  loadFromYaml(): ActionScriptInfo[] {
    const actionScriptList: ActionScriptInfo[] = [];
    const files = this.fileLoader.loadFiles({ searchDirectory: this.searchPath, fileTypes: ['.yaml'] });

    for (const file of files) {
      const actionsPerFile = parseYamlToObject(file.filePath);

      for (const action of actionsPerFile['actions']) {
        actionScriptList.push({ project: actionsPerFile['project'], ...action });
      }
    }

    return actionScriptList;
  }

  loadParameter(): ActionScriptParameter[] {
    const scriptList = this.loadFromYaml();
    const parameterList: ActionScriptParameter[] = [];

    for (const scriptDetail of scriptList) {
      for (const [index, actionStep] of scriptDetail.actionSteps.entries()) {
        parameterList.push({
          project: scriptDetail.project,
          actionName: scriptDetail.actionName,
          _function: actionStep,
          parameter: scriptDetail.parameter ? scriptDetail.parameter[index] : null
        });
      }
    }

    return parameterList;
  }

  private filterByProject({ project, actionList }: { project: string; actionList: ActionScriptInfo[] }) {
    return actionList.filter((data) => data.project === project);
  }

  private filterByActionName({ actionName, actionList }: { actionName: string; actionList: ActionScriptInfo[] }) {
    return actionList.filter((data) => data.actionName === actionName);
  }

  loadScript({ project, actionName }) {
    const workflowByProject = this.filterByProject({ project, actionList: this.loadFromYaml() });
    return this.filterByActionName({ actionName, actionList: workflowByProject });
  }
}
