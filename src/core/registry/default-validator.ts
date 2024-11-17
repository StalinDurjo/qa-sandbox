import {RegistryItem, RegistryValidator} from "@src/core/registry/base-registry";

export default class DefaultRegistryValidator<T extends RegistryItem> implements RegistryValidator<T> {
  validate(items: T[]): T[] {
    const names = items.map((item) => item.name);
    const directories = items.map((item) => item.directory);

    if (new Set(names).size !== names.length) {
      const duplicates = names.filter((item, index) => names.indexOf(item) !== index);
      throw new Error(`Items cannot have the same name: ${duplicates.join(', ')}`);
    }

    if (new Set(directories).size !== directories.length) {
      const duplicates = directories.filter((item, index) => directories.indexOf(item) !== index);
      throw new Error(`Multiple items cannot share same directory: ${duplicates.join(', ')}`);
    }

    return items;
  }
}