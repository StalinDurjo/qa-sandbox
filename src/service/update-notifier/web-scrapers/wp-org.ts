import { chromium } from 'playwright';
import dependencyUpdateNotifierScraper from '../notifier-scraper';

export default dependencyUpdateNotifierScraper.add('wporg', async (targetDependency: string, targetUrl: string) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(targetUrl);
  console.log(await page.locator('.plugin-title').allInnerTexts());

  const [pluginVersion] = await page.locator(`//ul/li[contains(text(), "Version")]//following-sibling::strong`).allInnerTexts();
  const [wordpressVersion] = await page.locator(`//ul/li[contains(text(), "WordPress version")]//following-sibling::strong`).allInnerTexts();
  const [phpVersion] = await page.locator(`//ul/li[contains(text(), "PHP version")]//following-sibling::strong`).allInnerTexts();

  await context.close();
  await browser.close();

  return {
    pluginVersion,
    wordpressVersion,
    phpVersion
  };
});
