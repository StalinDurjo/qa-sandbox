import path from "path";

export interface RegistryItem {
  name: string;
  directory: string;
}
export interface RegistryValidator<T> {
  validate(items: T[]): T[];
}

export interface RegistryLoader<T> {
  load(): Promise<void>;
}

export abstract class BaseRegistry <T extends RegistryItem> {
  protected items: T[] = [];
  protected basePath: string;
  protected validator?: RegistryValidator<T>;

  protected constructor(basePath: string, validator?: RegistryValidator<T>) {
    this.basePath = basePath;
    this.validator = validator;
  }

  abstract autoLoad(): void;

  protected normalizePath(directory: string): string {
    return path.normalize(
      path.join(path.resolve(process.cwd()) + this.basePath, directory)
    );
  }

  register(item: T): void {
    const normalizedDirectory = this.normalizePath(item.directory);
    this.items.push({ ...item, directory: normalizedDirectory });
  }

  getItems(): ReadonlyArray<T> {
    return this.validator ? this.validator.validate([...this.items]) : [...this.items];
  }

  protected getFullPath(): string {
    return path.resolve(process.cwd() + this.basePath);
  }
}