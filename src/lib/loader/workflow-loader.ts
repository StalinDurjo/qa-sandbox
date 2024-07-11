import { isFileOfType } from '../util/util';
import { parseYamlToObject } from '../util/yaml';
import FileLoader, { FileInfo, FileLoaderInterface } from './file-loader';

type Workflow = {
  workflow_name: string;
  repeat: number;
  task_list: string[];
};

export default class WorkflowLoader extends FileLoader implements FileLoaderInterface {
  private searchPath: string;
  private _prefix = 'workflow';

  constructor(searchDirectory: string) {
    super({ prefix: 'workflow', searchDirectory });
    this.searchPath = searchDirectory;
  }

  isValidWorkflowFile(file: FileInfo) {
    try {
      // check if file is of type .yaml
      if (!isFileOfType('.yaml', file.filePath)) {
        return false;
      }

      const data = parseYamlToObject(file.filePath);
      // check if data contains property of this._prefix and is an array
      if (!data.hasOwnProperty(this._prefix) && Array.isArray(data[this._prefix])) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  loadFromYaml(): Workflow[] | undefined {
    const workflowList: Workflow[] = [];

    const files = this.loadFiles({ searchDirectory: this.searchPath, fileTypes: ['.yaml'], excludeDirectories: [] });

    for (const file of files) {
      // check if file is a valid workflow yaml file
      if (!this.isValidWorkflowFile(file)) {
        return undefined;
      }

      const workflowsPerFile = parseYamlToObject(file.filePath)['workflow'];

      for (const workflow of workflowsPerFile) {
        workflowList.push(workflow);
      }
    }

    return workflowList;
  }

  objectFilter(data: Object[], { reverse, include, exclude }: { reverse?: boolean; include?: string[]; exclude?: string[] } = {}): Object[] {
    return super.objectFilter(data, { reverse, include, exclude });
  }
}
