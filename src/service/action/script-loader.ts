import FileLoader, { FileInfo } from '@src/lib/file-loader';
import { isFileOfType } from '@src/lib/util/util';
import { parseYamlToObject } from '@src/lib/util/yaml';
import path from 'path';

type ActionScriptInfo = {
  project: string;
  actionName: string;
  repeat: number;
  actionSteps: string[];
};

export default class ActionScriptLoader {
  private fileLoader: FileLoader;
  private prefix = 'action';
  private searchPath: string;

  constructor() {
    this.searchPath = path.join(path.resolve(process.cwd()) + '/action/script');
    this.fileLoader = new FileLoader({ prefix: this.prefix, searchDirectory: this.searchPath });
  }

  private isValidActionFile(file: FileInfo) {
    try {
      // check if file is of type .yaml
      if (!isFileOfType('.yaml', file.filePath)) {
        return false;
      }

      const data = parseYamlToObject(file.filePath);
      // check if data contains property of this._prefix and is an array
      if (!data.hasOwnProperty(this.prefix) && Array.isArray(data[this.prefix])) {
        return false;
      }

      if (!data.hasOwnProperty('project')) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  private loadFromYaml(): ActionScriptInfo[] {
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

  private filterByProject({ projectName, actionList: actionScriptList }: { projectName: string; actionList: ActionScriptInfo[] }) {
    return actionScriptList.filter((data) => data.project === projectName);
  }

  private filterByName({ actionName, actionList: actionScriptList }: { actionName: string; actionList: ActionScriptInfo[] }) {
    return actionScriptList.filter((data) => data.actionName === actionName);
  }

  loadScript({ projectName, actionName }) {
    const workflowByProject = this.filterByProject({ projectName, actionList: this.loadFromYaml() });
    return this.filterByName({ actionName, actionList: workflowByProject });
  }
}
