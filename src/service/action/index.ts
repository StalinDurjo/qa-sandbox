import { ActionRegistry } from '@src/service/action/action-registry';

export const actionRegistry = new ActionRegistry();
actionRegistry.autoLoad();
