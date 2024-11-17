import {RegistryItem, RegistryValidator} from "@src/core/registry/base-registry";

export default class ActionValidator <T extends RegistryItem> implements RegistryValidator<T> {
  validate(items: T[]): T[] {
    console.log('Reached!')
    return items;
  }
}