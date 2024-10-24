import dependencyUpdateNotifierScraper from './notifier-scraper';
import { database } from '../database';
import notifierList from './notifier-list';

type TaskStatus = () => Promise<{ currentVersion: string }>;

interface TaskConfig {
  name: string;
  function?: TaskStatus;
}

export class UpdateNotifier {
  private scrapperList = dependencyUpdateNotifierScraper.getFullList();

  async initialize() {
    await dependencyUpdateNotifierScraper.initialize();
    await this.populateInitialData();

    // console.log(await this.checkIsUpdateNeeded());
    await this.executeForUnstoredDependency();
  }

  private async populateInitialData() {
    for (const notifier of notifierList) {
      const isPresent = await database.all(`
        SELECT scraper_name, dependency_name 
        FROM dependency_update_notifier 
        WHERE scraper_name = '${notifier['scraper']}' AND dependency_name = '${notifier['dependency']}';  
      `);

      if (isPresent.length === 0) {
        let query = `INSERT INTO dependency_update_notifier (scraper_name, dependency_name, target_url, stored_data, compare_data, is_searchable) VALUES ('${notifier['scraper']}', '${notifier['dependency']}', '${notifier['targetUrl']}', '', '', 1);`;
        await database.run(query);
      }
    }
  }

  async getScrapperList() {
    return this.scrapperList;
  }

  async executeAll() {
    for (const item of notifierList) {
      const func = this.scrapperList.get(item['scraper']);
      await func(item['dependency'], item['targetUrl']);
    }
  }

  async execute(scraper: string, dependencyName: string, targetUrl: string) {
    const func = this.scrapperList.get(scraper);
    return await func(dependencyName, targetUrl);
  }

  // run scraper for all the dependencies for which stored_data is empty and is_searchable is true
  async executeForUnstoredDependency() {
    for (const notifier of notifierList) {
      const data = await database.all(`
        SELECT scraper_name, dependency_name, stored_data, is_searchable 
        FROM dependency_update_notifier 
        WHERE scraper_name = '${notifier['scraper']}' AND dependency_name = '${notifier['dependency']}';  
      `);

      if (!data[0]['stored_data'] && data[0]['is_searchable']) {
        // const scraperData = await this.execute(notifier['scraper'], notifier['dependency']);

        const scraperData = { version: 10, wordpress_version: 20, php_version: 2.5 };

        const query = `
        UPDATE dependency_update_notifier
        SET stored_data = '${JSON.stringify(scraperData)}'
        WHERE scraper_name = '${notifier['scraper']}' AND dependency_name = '${notifier['dependency']}';
        `;

        await database.run(query);
      }
    }
  }

  // checks if stored_data is empty and if is_searchable true
  // if so, run scraper and populate with data for that specific dependency
  async checkIsUpdateNeeded() {
    const list = await database.all(`
      SELECT scraper_name, dependency_name, stored_data, compare_data, is_searchable 
      FROM dependency_update_notifier;  
    `);

    for (const item of list) {
      if (!item['stored_data'] && item['is_searchable'] === 1) {
        return true;
      }
    }

    return false;
  }
}

const updateNotifier = new UpdateNotifier();
export default updateNotifier;
