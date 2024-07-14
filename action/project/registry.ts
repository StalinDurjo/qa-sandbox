import ActionRegistry from '@src/service/action/registry';

const actionRegistry = new ActionRegistry();

actionRegistry.register({
  name: 'wordpress',
  directory: './wordpress'
});

export default actionRegistry;
