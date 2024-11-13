import { searchFiles } from '@src/lib/util/util';
import path from 'path';
import fs from 'fs';

export interface DependencyVersion {
  pluginVersion: string;
  wordpressVersion: string;
  phpVersion: string;
}

export type ScraperFunction = (targetDependency: string, targetUrl: string) => Promise<DependencyVersion>;

export class WebScraperLoader {
  private scrapers: Map<string, ScraperFunction> = new Map();

  registerScraper(name: string, scraper: ScraperFunction): void {
    this.scrapers.set(name, scraper);
  }

  getScraper(name: string): ScraperFunction | undefined {
    return this.scrapers.get(name);
  }

  getScrapers(): Map<string, ScraperFunction> {
    return this.scrapers;
  }

  async loadScrapers(): Promise<void> {
    const scraperPath = path.join(__dirname, './scrapers');
    const files = searchFiles(scraperPath, ['.ts']);

    for (const file of files) {
      const module = await import(file);
      module.default(this);
    }
  }

  async load() {
    const directoryPath = process.cwd() + `/includes/version-tracker/scrapers`;
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const fileName = file;
      const fullPath = path.join(directoryPath, file);
      const scraperName = fileName.split('.ts')[0];
      const module = await import(fullPath);
      this.registerScraper(scraperName, module.default);
    }
  }
}
