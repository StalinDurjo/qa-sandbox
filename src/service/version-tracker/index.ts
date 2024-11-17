import { DependencyDatabaseQueries } from './db-query';
import { VersionTracker } from './version-tracker';
import { VersionTrackerMessageDispatcher } from './dispatch';
import { ScraperRegistry } from '@src/service/version-tracker/scraper-registry';
import Scheduler from '@src/core/scheduler';
import logger from '@src/core/logger';

export const scraperRegistry = new ScraperRegistry();
export const versionTracker = new VersionTracker(new DependencyDatabaseQueries(), new VersionTrackerMessageDispatcher());

(async () => {
  await scraperRegistry.autoLoad();
  await versionTracker.initialize();
})();

Scheduler.scheduleTask({
  name: 'run-tracker-for-unstored-dependencies',
  schedule: '0 */15 * * * *', // runs every 15 minute
  function: async () => {
    logger.info(`Task: 'run-tracker-for-unstored-dependencies' is running.`);
    await versionTracker.processUnstoredDependencies();
  }
});

Scheduler.scheduleTask({
  name: 'run-version-tracker',
  schedule: '0 */25 * * * *', // runs every 25 minute
  function: async () => {
    logger.info(`Task: 'run-version-tracker' is running.`);
    await versionTracker.executeAllTrackers();

    const records = await versionTracker.database.getAllDependencyRecords();

    for (const record of records) {
      const isDataDifferent = versionTracker.isDataDifferent(record.stored_data, record.compare_data);

      if (isDataDifferent) {
        versionTracker.messageDispatcher.collect(record.dependency_name, JSON.parse(record.compare_data));
      }
    }

    await versionTracker.messageDispatcher.dispatch();
    versionTracker.messageDispatcher.clearCollection();

    await versionTracker.moveCompareDataToStored();
  }
});
