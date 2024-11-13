import { scheduler } from '@src/scheduler';
import { DependencyDatabaseQueries } from './db-query';
import { WebScraperLoader } from './scraper-loader';
import { VersionTracker } from './version-tracker';
import { VersionTrackerMessageDispatcher } from './dispatch';

export const versionTracker = new VersionTracker(new DependencyDatabaseQueries(), new WebScraperLoader(), new VersionTrackerMessageDispatcher());

export const scraperLoader = new WebScraperLoader();

(async () => {
  await versionTracker.initialize();
})();

scheduler.scheduleTask({
  name: 'run-tracker-for-unstored-dependencies',
  schedule: '0 */15 * * * *', // runs every 15 minute
  function: async () => {
    console.log(`Task: 'run-tracker-for-unstored-dependencies' is running.`);
    await versionTracker.processUnstoredDependencies();
  }
});

scheduler.scheduleTask({
  name: 'run-version-tracker',
  schedule: '0 */25 * * * *', // runs every 25 minute
  function: async () => {
    console.log(`Task: 'run-version-tracker' is running.`);
    await versionTracker.executeAllTrackers();

    const records = await versionTracker.database.getAllDependencyRecords();

    for (const record of records) {
      const isDataDifferent = versionTracker.isDataDifferent(record.stored_data, record.compare_data);

      if (isDataDifferent) {
        versionTracker.messageDispatcher.collect(record.dependency_name, JSON.parse(record.compare_data));
      }
    }

    versionTracker.messageDispatcher.dispatch();
    versionTracker.messageDispatcher.clearCollection();

    await versionTracker.moveCompareDataToStored();
  }
});
