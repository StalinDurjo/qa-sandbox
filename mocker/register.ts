import { mockRegistry } from '@src/service/mocker-request/mocker-registry';

mockRegistry.register({ directory: './dokan' });
mockRegistry.register({ directory: './default' });

export default mockRegistry;
