import {BaseRegistry, RegistryItem} from "@src/core/registry/base-registry";
import fs from "fs";
import {mockRequestRegistry} from "@src/service/mock-request/index";
import DefaultRegistryValidator from "@src/core/registry/default-validator";

export class MockRequestRegistry extends BaseRegistry<RegistryItem> {
  constructor() {
    super('/includes/mocker/project', new DefaultRegistryValidator());
  }

  autoLoad(){
    const registryPath: string = mockRequestRegistry.getFullPath();
    const files = fs.readdirSync(registryPath);

    for (const file of files) {
      const projectName = file;

      mockRequestRegistry.register({
        name: projectName,
        directory: `./${projectName}`
      });
    }
  }
}