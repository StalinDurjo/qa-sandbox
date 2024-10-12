import { toFileUrl } from '@src/lib/util/util';
import path from 'path';

class MockRegistry {
  private registeredProjectList = [];

  register({ name, directory }): void {
    const projectDirectory = path.normalize(path.join(path.resolve(process.cwd()) + '/mocker/project', directory));
    this.registeredProjectList.push({ name, directory: projectDirectory });
  }

  registeredProjects() {
    return this.registeredProjectList;
  }

  async initialize() {
    for (const project of this.registeredProjectList) {
      const _import = await import(toFileUrl(project.directory));
      _import.default;
    }
  }
}

export const mockRegistry = new MockRegistry();
