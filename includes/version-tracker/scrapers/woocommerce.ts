import { DependencyVersion, WebScraperLoader } from '@src/service/version-tracker/scraper-loader';
import { chromium } from 'playwright';

export default async function woocommerceScraper(targetDependency: string, targetUrl: string): Promise<DependencyVersion> {
  const browser = await chromium.launch({ headless: true, timeout: 120 * 1000 });
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
