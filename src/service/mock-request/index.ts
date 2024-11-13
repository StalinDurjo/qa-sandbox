import fs from 'fs';
import MockRequestRegistry from './mock-registry';
import MockRequest from './mock-request';

export const mockRequestRegistry = new MockRequestRegistry();

const registryPath: string = process.cwd() + '/includes/mocker/project';
const files = fs.readdirSync(registryPath);

for (const file of files) {
  const projectName = file;
  mockRequestRegistry.register({
    name: projectName,
    directory: `./${projectName}`
  });
}

export const mockRequest = new MockRequest();
