import {BaseRegistry, RegistryItem} from "@src/core/registry/base-registry";
import fs from "fs";
import {mockRequestRegistry} from "@src/service/mock-request/index";

export class MockRequestRegistry extends BaseRegistry<RegistryItem> {
  constructor() {
    super('/includes/mocker/project');
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