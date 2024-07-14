import FileLoader, { FileInfo, FileLoaderInterface } from '@src/lib/file-loader';
import { isFileOfType } from '@src/lib/util/util';
import { parseYamlToObject } from '@src/lib/util/yaml';

type Workflow = {
  project: string;
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

      if (!data.hasOwnProperty('project')) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  loadFromYaml(): Workflow[] {
    const workflowList: Workflow[] = [];
    const files = this.loadFiles({ searchDirectory: this.searchPath, fileTypes: ['.yaml'], excludeDirectories: [] });

    for (const file of files) {
      const workflowsPerFile = parseYamlToObject(file.filePath);

      for (const workflow of workflowsPerFile['workflow']) {
        workflowList.push({ project: workflowsPerFile['project'], ...workflow });
      }
    }

    return workflowList;
  }

  objectPropertyFilter(data: Object[], { reverse, include, exclude }: { reverse?: boolean; include?: string[]; exclude?: string[] } = {}): Object[] {
    return super.objectPropertyFilter(data, { reverse, include, exclude });
  }
}
