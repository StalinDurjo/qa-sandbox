import notifierScrapper from './notifier-scrapper';
import notifierList from './notifier-list';

type TaskStatus = () => Promise<{ currentVersion: string }>;

interface TaskConfig {
  name: string;
  function?: TaskStatus;
}

export class UpdateNotifier {
  private scrapperList = notifierScrapper.getFullList();

  async initialize() {
    await notifierScrapper.initialize();
  }

  private async populateInitialData() {}

  async getScrapperList() {
    return this.scrapperList;
  }

  async executeAll() {
    for (const item of notifierList) {
      const func = this.scrapperList.get(item['scrapper']);
      console.log(await func(item['dependency']));
    }
  }

  async execute(dependencyName: string) {}

  // run scraper for all the dependencies for which stored_data is empty and is_searchable is true
  async executeForUnstoredDependency() {}

  // checks if stored_data is empty and if is_searchable true
  // if so, run scraper and populate with data for that specific dependency
  async checkIsUpdateNeeded() {}
}

const updateNotifier = new UpdateNotifier();
export default updateNotifier;

// version
// wordpress version
// php version

// scrapper name
// dependency name
// previous
// current

/*
IF no data, THEN run scraper AND add data
==> data added to `data`

*/
