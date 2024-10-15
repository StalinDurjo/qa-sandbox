import { actionRegistry } from '@src/service/action/action-registry';

actionRegistry.register({
  name: 'wordpress',
  directory: './wordpress'
});

actionRegistry.register({
  name: 'dokan',
  directory: './dokan'
});

export default actionRegistry;
