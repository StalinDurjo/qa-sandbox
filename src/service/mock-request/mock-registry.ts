import path from 'path';

interface ProjectConfig {
  name: string;
  directory: string;
}

export default class MockRequestRegistry {
  private registeredProjectList: ProjectConfig[] = [];

  register({ name, directory }: ProjectConfig): void {
    const projectDirectory = path.normalize(path.join(path.resolve(process.cwd()) + '/includes/mocker/project', directory));
    this.registeredProjectList.push({ name, directory: projectDirectory });
  }

  getRegisteredProjects(): ReadonlyArray<ProjectConfig> {
    return this.registeredProjectList;
  }
}
