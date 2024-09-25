import '@testConfig';
import { initServer } from './server/server';
import '../actions/register';
import BrowserUtil from './lib/browser';
import action from './service/action/action';
import WpLoginPage from '@pages/woocommerce/wp-admin/auth/login.page';
import MockData from './service/mock-data/mock-data';

(async function main() {
  // start local server
  await initServer();

  const mocker = new MockData();
  // mocker.test();
  mocker.generate({ properties: ['firstName', 'lastName', 'fullName', 'country', 'state', 'iban'] });

  // generate random data
  // mocker.generate()

  // generate data with specific properties
  // mocker.generate({name, email, address})

  // generate data with specified properties including overriden data
  // mocker.generate({
  //   overwrite: {
  //     name: 'Robert'
  //   },
  //   properties: {name, email, address, phone}
  // })
})();
