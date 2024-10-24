import { searchFiles } from '@src/lib/util/util';

interface WebScraperResult {
  pluginVersion: string;
  wordpressVersion: string;
  phpVersion: string;
}

type WebScraperFunction = (targetDependency: string, targetUrl: string) => Promise<WebScraperResult>;

class DependencyUpdateNotifierScraper {
  private scrapperList: Map<string, WebScraperFunction> = new Map();

  add(name: string, callback: WebScraperFunction): void {
    this.scrapperList.set(name, callback);
  }

  get(scrapperName: string): WebScraperFunction {
    return this.scrapperList.get(scrapperName);
  }

  getFullList() {
    return this.scrapperList;
  }

  async initialize(): Promise<void> {
    const path = __dirname + `/web-scrapers/`;
    const files = searchFiles(path, ['.ts']);

    for (const file of files) {
      const module = await import(file);
      module.default;
    }
  }
}

const dependencyUpdateNotifierScraper = new DependencyUpdateNotifierScraper();
export default dependencyUpdateNotifierScraper;
