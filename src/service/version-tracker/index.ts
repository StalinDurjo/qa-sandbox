import { DependencyDatabaseQueries } from './db-query';
import { WebScraperLoader } from './scraper-loader';
import { VersionTracker } from './version-tracker';

export const versionTracker = new VersionTracker(new DependencyDatabaseQueries(), new WebScraperLoader());
