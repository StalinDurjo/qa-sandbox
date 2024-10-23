import '@testConfig';
import { initServer } from './server/server';
import '../includes/actions/register';
import '../includes/mocker/register';
import { initializeDatabase } from './service/database';
import { initializeMockData } from './service/mocker';
import { dynamicRouter } from './server/route/dynamic-router';
import { mockerRegistry } from './service/mocker-request/mocker-registry';
import './service/mailer/mailer';
import './scheduler';
import updateNotifier from './service/update-notifier/update-notifier';

(async () => {
  // start local server
  await initServer();
  // create database and its tables
  await initializeDatabase();
  // populate database with mock data
  await initializeMockData();
  // initialize mocker projects
  await mockerRegistry.initialize();
  // initialize the creation of dynamic routes
  dynamicRouter.initialize();

  await updateNotifier.initialize();

  // console.log(await updateNotifier.getScrapperList());
  // await updateNotifier.executeAll();

  // await updateNotifier.execute('wporg', 'hello2');
})();
