import { dependencies } from 'includes/version-tracker/dependency-list';
import { DependencyDatabaseQueries } from './db-query';
import { VersionTrackerMessageDispatcher } from './dispatch';
import { DepedencyVersionTracker } from '@src/type';
import { scraperRegistry } from '@src/service/version-tracker/index';
import { Browser, BrowserContext, chromium } from 'playwright';

export class VersionTracker {
  constructor(
    readonly database: DependencyDatabaseQueries,
    readonly messageDispatcher: VersionTrackerMessageDispatcher
  ) {}

  async initialize(): Promise<void> {
    await this.populateInitialData();
  }

  isDataDifferent(existingData: string, newData: string): boolean {
    return existingData && newData && existingData !== newData;
  }

  private async populateInitialData(): Promise<void> {
    for (const config of dependencies) {
      const records = await this.database.getDependencyRecord(config.scraper, config.dependency);

      if (records.length === 0) {
        await this.database.insertDependencyRecord({
          scraper_name: config.scraper,
          dependency_name: config.dependency,
          target_url: config.targetUrl
        });
      }
    }
  }

  async checkUpdatesNeeded(): Promise<boolean> {
    const records = await this.database.getAllDependencyRecords();
    return records.some((record) => !record.stored_data && record.is_searchable === 1);
  }

  async executeScrapers(configs?: DepedencyVersionTracker.DependencyConfig[], storeInCompareData: boolean = false): Promise<void> {
    const targetsToScrape = configs || dependencies;

    for (const config of targetsToScrape) {
      const scraper = scraperRegistry.getScraper(config.scraper);
      if (!scraper) {
        console.error(`No scraper found for: ${config.scraper}`);
        continue;
      }

      let browser: Browser;
      let context: BrowserContext;

      try {
        browser = await chromium.launch({ headless: true, timeout: 120 * 1000 });
        context = await browser.newContext();
        const page = await context.newPage();
        const data = await scraper({ page, targetDependency: config.dependency, targetUrl: config.targetUrl });

        if (storeInCompareData) {
          await this.database.updateCompareData(config.scraper, config.dependency, JSON.stringify(data));
        } else {
          await this.database.updateStoredData(config.scraper, config.dependency, JSON.stringify(data));
        }
      } catch (error) {
        await this.database.updateIsSearchable(config.scraper, config.dependency, '0');
        console.error(`Error scraping ${config.dependency} with ${config.scraper}:`, error);
      } finally {
        await context.close();
        await browser.close();
      }
    }
  }

  async processUnstoredDependencies(): Promise<void> {
    const records = await this.database.getAllDependencyRecords();

    const unstoredDependencies = dependencies.filter((dep) => {
      const record = records.find((r) => r.scraper_name === dep.scraper && r.dependency_name === dep.dependency);
      return record && !record.stored_data && record.is_searchable === 1;
    });

    if (unstoredDependencies.length > 0) {
      await this.executeScrapers(unstoredDependencies);
    }
  }

  async executeAllTrackers() {
    const records = await this.database.getAllDependencyRecords();

    const _dependencies = dependencies.filter((dep) => {
      const record = records.find((r) => r.scraper_name === dep.scraper && r.dependency_name === dep.dependency);
      return record && record.is_searchable === 1;
    });

    await this.executeScrapers(_dependencies, true);
  }

  async moveCompareDataToStored(): Promise<void> {
    const records = await this.database.getAllDependencyRecords();
    for (const record of records) {
      if (record.is_searchable === 1 && record.compare_data) {
        // Move compare_data to stored_data and clear compare_data
        await this.database.moveCompareToStored(record.scraper_name, record.dependency_name);
      }
    }
  }
}
