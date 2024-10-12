import { mockRegistry } from '@src/service/mock-request/mock-registry';

mockRegistry.register({
  name: 'dokan',
  directory: './dokan'
});

mockRegistry.register({
  name: 'default',
  directory: './default'
});

export default mockRegistry;
