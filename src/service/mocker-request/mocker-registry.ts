import path from 'path';
import { promises as fs } from 'fs';

interface ProjectConfig {
  name: string;
  directory: string;
}

class MockerRegistry {
  private registeredProjectList: ProjectConfig[] = [];

  register({ name, directory }: ProjectConfig): void {
    const projectDirectory = path.normalize(path.join(path.resolve(process.cwd()) + '/mocker/project', directory));
    this.registeredProjectList.push({ name, directory: projectDirectory });
  }

  getRegisteredProjects(): ReadonlyArray<ProjectConfig> {
    return this.registeredProjectList;
  }

  async initialize(): Promise<void> {
    for (const project of this.registeredProjectList) {
      try {
        const modulePath = path.join(project.directory, 'index.ts');
        if (await fs.stat(modulePath)) {
          const module = await import(modulePath);
          module.default;
        } else {
          console.warn(`Project file not found: ${modulePath}`);
        }
      } catch (error) {
        console.error(`Error initializing project ${project.name}:`, error);
      }
    }
  }
}

export const mockRegistry = new MockerRegistry();
