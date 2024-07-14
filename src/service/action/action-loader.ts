import actionRegistry from 'action/project/registry';
import { toFileUrl } from '@src/lib/util/util';

export default class ActionLoader {
  private async asObjectList() {
    try {
      const data: unknown[] = [];
      const projectList = await actionRegistry.load();

      for (const project of projectList) {
        const _import = await import(toFileUrl(project.directory));
        const _module = _import.default;
        const instance = new _module();
        const properties = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(instance));

        const detailsPerProject = {};
        detailsPerProject['projectName'] = project.name;
        detailsPerProject['properties'] = properties;

        data.push(detailsPerProject);
      }

      return data;
    } catch (error) {
      throw new Error('Something went wrong while loading action projects\n' + error);
    }
  }

  async loadActionList({ project }: { project: string }) {
    try {
      const actions = (await this.asObjectList()).filter((data) => data['projectName'] === project);

      const [methodObject] = actions.map((data) => {
        return data['properties'];
      });

      const methodList = Object.keys(methodObject)
        .map((key) => methodObject[key].value)
        .filter((item) => typeof item === 'function');

      return methodList;
    } catch (error) {
      throw new Error('Something went wrong while returning project actions as list \n' + error);
    }
  }
}
