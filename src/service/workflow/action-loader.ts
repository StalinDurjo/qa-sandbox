import { toFileUrl } from '@src/lib/util/util';
import path from 'path';

export default class ActionLoader {
  private actionList = [];

  register({ projectName, projectDirectory }: { projectName: string; projectDirectory: string }) {
    const _projectDirectory = path.join(path.resolve(process.cwd()) + '/actions', projectDirectory);
    this.actionList.push({ projectName, projectDirectory: _projectDirectory });
  }

  async load() {
    const data: unknown[] = [];

    for (const action of this.actionList) {
      // const _import = await import(action.projectDirectory);
      const _import = await import(toFileUrl(action.projectDirectory));
      const _module = _import.default;
      const instance = new _module();
      const properties = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(instance));

      const project = {};
      project['projectName'] = action.projectName;
      project['properties'] = properties;

      data.push(project);
    }

    return data;
  }
}
