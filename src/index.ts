import '@testConfig';
import { initServer } from './server/server';
import './service/action';
import './service/mocker';
import { initializeDatabase } from './service/database';
import { dynamicRouter } from './server/route/dynamic-router';
import './service/mailer/mailer';
import './scheduler';
import { versionTracker } from './service/version-tracker';
import { mockRequest } from './service/mock-request';

(async () => {
  // start local server
  await initServer();
  // create database and its tables
  await initializeDatabase();
  await mockRequest.initializeRoutes();
  // initialize the creation of dynamic routes
  dynamicRouter.initialize();
  await versionTracker.initialize();
})();
