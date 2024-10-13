import { mockRegistry } from '@src/service/mocker-request/mocker-registry';

mockRegistry.register({
  name: 'dokan',
  directory: './dokan'
});

mockRegistry.register({
  name: 'default',
  directory: './default'
});

export default mockRegistry;
