import fs from "fs";
import {ActionRegistry} from "@src/service/action/action-registry";

export const actionRegistry = new ActionRegistry()
actionRegistry.autoLoad()

// const registryPath: string = process.cwd() + '/includes/actions/project'
// const files = fs.readdirSync(registryPath);
//
// for(const file of files){
//   const projectName = file
//   actionRegistry.register({
//     name: projectName,
//     directory: `./${projectName}`
//   });
// }