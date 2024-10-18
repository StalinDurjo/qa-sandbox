import { mockerRegistry } from '@src/service/mocker-request/mocker-registry';

mockerRegistry.register({ directory: './dokan' });
mockerRegistry.register({ directory: './default' });

export default mockerRegistry;
