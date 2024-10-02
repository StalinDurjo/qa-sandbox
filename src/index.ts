import '@testConfig';
import { initServer } from './server/server';
import '../actions/register';
import BrowserUtil from './lib/browser';
import action from './service/action/action';
import WpLoginPage from '@pages/woocommerce/wp-admin/auth/login.page';
import SQlite from './lib/sqlite';
import { initializeDatabase } from './service/local-db';

(async function main() {
  // start local server
  await initServer();
  // create database and its tables
  await initializeDatabase();
})();
