import '@testConfig';
import { initServer } from './server/server';
import { initializeDatabase } from './core/database';
import './service/action';
import './core/mocker'
import { dynamicRouter } from './server/route/dynamic-router';
import './service/mailer/mailer';
import './core/scheduler'
import './service/version-tracker';
import { mockRequest } from './service/mock-request';

(async () => {
  try{
    // start local server
    await initServer();
    // create database and its tables
    await initializeDatabase();
    await mockRequest.initializeRoutes();
    // initialize the creation of dynamic routes
    dynamicRouter.initialize();
  }catch(error){
    console.log(error)
  }
})();
