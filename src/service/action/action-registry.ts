import {BaseRegistry, RegistryItem} from "@src/core/registry/base-registry";
import fs from "fs";
import {actionRegistry} from "@src/service/action/index";
import ActionValidator from "@src/service/action/action-validator";

export class ActionRegistry extends BaseRegistry<RegistryItem> {
  constructor() {
    super(
      '/includes/actions/project',
      new ActionValidator()
    );
  }

  autoLoad(): void {
    const registryPath: string = this.getFullPath()
    const files = fs.readdirSync(registryPath);

    for(const file of files){
      const projectName = file
      actionRegistry.register({
        name: projectName,
        directory: './' + projectName
      });
    }
  }
}