import { DependencyVersion, WebScraperLoader } from '../scraper-loader';

export async function woocommerceScraper(targetDependency: string, targetUrl: string): Promise<DependencyVersion> {
  return {
    pluginVersion: '',
    wordpressVersion: '',
    phpVersion: ''
  };
}

// Register the scraper
export default function register(scraperLoader: WebScraperLoader): void {
  scraperLoader.registerScraper('woocommerce', woocommerceScraper);
}
