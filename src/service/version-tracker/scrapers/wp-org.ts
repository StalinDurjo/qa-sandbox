import { chromium } from 'playwright';
import { DependencyVersion, WebScraperLoader } from '../scraper-loader';

export async function wporgScraper(targetDependency: string, targetUrl: string): Promise<DependencyVersion> {
  console.log('Running.');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(targetUrl);

    const [pluginVersion] = await page.locator(`//ul/li[contains(text(), "Version")]//following-sibling::strong`).allInnerTexts();

    const [wordpressVersion] = await page.locator(`//ul/li[contains(text(), "WordPress version")]//following-sibling::strong`).allInnerTexts();

    const [phpVersion] = await page.locator(`//ul/li[contains(text(), "PHP version")]//following-sibling::strong`).allInnerTexts();

    return { pluginVersion, wordpressVersion, phpVersion };
  } finally {
    await context.close();
    await browser.close();
  }
}

// Register the scraper
export default async function register(scraperLoader: WebScraperLoader): Promise<void> {
  scraperLoader.registerScraper('wp-org', wporgScraper);
}
