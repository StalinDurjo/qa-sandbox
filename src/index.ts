import '@testConfig';
import { initServer } from './server/server';
import '../actions/register';
import { initializeDatabase } from './service/local-database';
import { initializeMockData } from './service/mock-data';

(async function () {
  // start local server
  await initServer();
  // create database and its tables
  await initializeDatabase();
  // populate database with mock data
  await initializeMockData();
})();
