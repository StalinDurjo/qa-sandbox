import '@testConfig';
import { initServer } from './server/server';
import { initializeDatabase } from './core/database';
import './service/action';
import { dynamicRouter } from './server/route/dynamic-router';
import './service/mailer/mailer';
import './core/scheduler';
import './service/version-tracker';
import { mockRequest } from './service/mock-request';
import { initializeMockData } from './core/mocker';

(async () => {
  try {
    // start local server
    await initServer();
    // create database and its tables
    await initializeDatabase();
    // populate database with mock data
    await initializeMockData();
    // initialize dynamic routes for mock request
    await mockRequest.initializeRoutes();
    // initialize the creation of dynamic routes
    dynamicRouter.initialize();
  } catch (error) {
    console.log(error);
  }
})();
