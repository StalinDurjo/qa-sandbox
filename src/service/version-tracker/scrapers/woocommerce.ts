import { chromium } from 'playwright';
import { DependencyVersion, WebScraperLoader } from '../scraper-loader';

export async function woocommerceScraper(targetDependency: string, targetUrl: string): Promise<DependencyVersion> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(targetUrl);

    const [pluginVersion] = await page.locator(`//aside//div[@class="wccom-product-box"]//a/div/p[text()="Latest version"]/following-sibling::p`).allInnerTexts();

    return {
      pluginVersion,
      wordpressVersion: '',
      phpVersion: ''
    };
  } finally {
    await context.close();
    await browser.close();
  }
}

// Register the scraper
export default function register(scraperLoader: WebScraperLoader): void {
  scraperLoader.registerScraper('woocommerce', woocommerceScraper);
}
