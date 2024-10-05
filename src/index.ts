import '@testConfig';
import { initServer } from './server/server';
import '../actions/register';
import { initializeDatabase } from './service/local-database';
import Mocker from './service/mock-data/mocker';

(async function main() {
  // start local server
  await initServer();
  // create database and its tables
  // await initializeDatabase();

  const mocker = await new Mocker('US').initialize();
  console.log(await mocker.location.division());
})();
