import '@testConfig';
import { initServer } from './server/server';
import '../includes/actions/register';
import '../mocker/register';
import { initializeDatabase } from './service/database';
import { initializeMockData } from './service/mocker';
import { dynamicRouter } from './server/route/dynamic-router';
import { mockerRegistry } from './service/mocker-request/mocker-registry';

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
})();
