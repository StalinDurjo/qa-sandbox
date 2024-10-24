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
import { dependencies } from './service/version-tracker/dependency-list';
import { VersionTracker } from './service/version-tracker/version-tracker';
import { DependencyDatabaseQueries } from './service/version-tracker/db-query';
import { WebScraperLoader } from './service/version-tracker/scraper-loader';
import { scheduler } from './scheduler';
import { versionTracker } from './service/version-tracker';

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
  await versionTracker.initialize();

  // console.log(await updateNotifier.getScrapperList());
  // await updateNotifier.executeAll();

  // console.log(await updateNotifier.execute('wporg', 'hello2', 'https://wordpress.org/plugins/woocommerce/'));

  // console.log(dependencies);

  // const versionTracker = new VersionTracker(new DependencyDatabaseQueries(), new WebScraperLoader());
  // await versionTracker.initialize();

  // await versionTracker.test();

  // await versionTracker.processUnstoredDependencies();

  scheduler.scheduleTask({
    name: 'run-tracker-for-unstored-dependencies',
    // schedule: '*/5 * * * * *',
    schedule: '* 11 * * * *', // run when minute is at 5 (e.g. 10:05)
    function: async () => {
      console.log('executed');
      await versionTracker.processUnstoredDependencies();
    }
  });

  // console.log(scheduler.listAllTasks());
})();
