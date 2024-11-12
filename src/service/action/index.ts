import fs from "fs";
import {actionRegistry} from "@src/service/action/action-registry";

const registryPath: string = process.cwd() + '/includes/actions/project'
const files = fs.readdirSync(registryPath);

for(const file of files){
  const projectName = file
  actionRegistry.register({
    name: projectName,
    directory: `./${projectName}`
  });
}