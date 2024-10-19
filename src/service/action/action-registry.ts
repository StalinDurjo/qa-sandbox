import path from 'path';

export type ProjectInfo = {
  name: string;
  directory: string;
};

class ActionRegistry {
  private registeredProjectList: ProjectInfo[] = [];

  private validate(projects: ProjectInfo[]) {
    const names = projects.map((project) => project.name);
    const directories = projects.map((project) => project.directory);

    if (new Set(names).size !== names.length) {
      const duplicates = names.filter((item, index) => names.indexOf(item) !== index);
      throw new Error(`Projects cannot have the same name: ${duplicates.join(', ')}`);
    }

    if (new Set(directories).size !== directories.length) {
      const duplicates = directories.filter((item, index) => directories.indexOf(item) !== index);
      throw new Error(`Multiple projects cannot share same directory: ${duplicates.join(', ')}`);
    }

    return projects;
  }

  register({ name, directory }: ProjectInfo): void {
    const projectDirectory = path.normalize(path.join(path.resolve(process.cwd()) + '/includes/actions/project', directory));
    this.registeredProjectList.push({ name, directory: projectDirectory });
  }

  registeredProjects(): ProjectInfo[] {
    return this.validate(this.registeredProjectList);
  }
}

export const actionRegistry = new ActionRegistry();
