import { toFileUrl } from '@src/lib/util/util';
import path from 'path';

type ProjectDetails = {
  name: string;
  directory: string;
};

export default class ActionRegistry {
  private projectList: ProjectDetails[] = [];

  validate(projectList: ProjectDetails[]) {
    const projectNames = projectList.map((data) => data.name);
    const projectDirectories = projectList.map((data) => data.directory);

    if (new Set(projectNames).size !== projectNames.length) {
      throw new Error('Projects cannot have same name');
    }

    if (new Set(projectDirectories).size !== projectDirectories.length) {
      throw new Error('Projects cannot have the same directory');
    }
  }

  register({ name, directory }: ProjectDetails) {
    const projectDirectory = path.join(path.resolve(process.cwd()) + '/action/project', directory);

    this.projectList.push({ name, directory: projectDirectory });
  }

  async load() {
    this.validate(this.projectList);
    return this.projectList;
  }
}
