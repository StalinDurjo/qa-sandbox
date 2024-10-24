import { DependencyDatabaseQueries } from './db-query';
import { dependencies, DependencyConfig } from './dependency-list';
import { WebScraperLoader } from './scraper-loader';

export class VersionTracker {
  constructor(
    private readonly database: DependencyDatabaseQueries,
    private readonly scraperLoader: WebScraperLoader
  ) {
    this.database = new DependencyDatabaseQueries();
    this.scraperLoader = new WebScraperLoader();
  }

  async test() {
    // console.log(await this.database.getAllDependencyRecords());
    // console.log(await this.database.getDependencyRecord('wp-org', 'Contact Form 7'));
  }

  async initialize(): Promise<void> {
    await this.scraperLoader.loadScrapers();
    await this.populateInitialData();
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

  async executeScrapers(configs?: DependencyConfig[]): Promise<void> {
    const targetsToScrape = configs || dependencies;

    for (const config of targetsToScrape) {
      const scraper = this.scraperLoader.getScraper(config.scraper);
      if (!scraper) {
        console.error(`No scraper found for: ${config.scraper}`);
        continue;
      }

      try {
        const data = await scraper(config.dependency, config.targetUrl);
        await this.database.updateStoredData(config.scraper, config.dependency, JSON.stringify(data));
      } catch (error) {
        console.error(`Error scraping ${config.dependency} with ${config.scraper}:`, error);
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
}
