import '@testConfig';
import { initServer } from './server/server';
import '../actions/register';
import '../mocker/register';
import { initializeDatabase } from './service/database';
import { initializeMockData } from './service/mocker';
import { routeManager } from './server/route/route-manager';
import { mockRegistry } from './service/mocker-request/mocker-registry';

(async function () {
  // start local server
  await initServer();
  // create database and its tables
  await initializeDatabase();
  // populate database with mock data
  await initializeMockData();

  await mockRegistry.initialize();
  routeManager.initialize();
})();
