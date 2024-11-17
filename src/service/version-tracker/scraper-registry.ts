import fs from 'fs';
import path from 'path';
import { BaseRegistry, RegistryItem } from '@src/core/registry/base-registry';
import { Page } from 'playwright';

export interface ScraperItem extends RegistryItem {
  scraper: ScraperFunction;
}

export type ScraperFunction = ({ page, targetDependency, targetUrl }: { page: Page; targetDependency?: string; targetUrl: string }) => Promise<DependencyVersion>;

export interface DependencyVersion {
  pluginVersion: string;
  wordpressVersion: string;
  phpVersion: string;
}

export class ScraperRegistry extends BaseRegistry<ScraperItem> {
  constructor() {
    super('/includes/version-tracker/scrapers');
  }

  async autoLoad(): Promise<void> {
    const fullPath = this.getFullPath();
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Scrapers directory not found: ${fullPath}`);
    }

    const files = fs.readdirSync(fullPath);
    for (const file of files) {
      if (!file.endsWith('.ts')) continue;

      const scraperName = file.split('.ts')[0];
      const fullFilePath = path.join(fullPath, file);

      try {
        const module = await import(fullFilePath);
        this.register({
          name: scraperName,
          directory: file,
          scraper: module.default
        });
      } catch (error) {
        console.error(`Failed to load scraper ${scraperName}:`, error);
      }
    }
  }

  getScraper(name: string): ScraperFunction | undefined {
    return this.items.find((item) => item.name === name)?.scraper;
  }
}
