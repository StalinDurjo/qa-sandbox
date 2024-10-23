import { chromium } from 'playwright';
import dependencyUpdateNotifierScraper from '../notifier-scraper';

export default dependencyUpdateNotifierScraper.add('wporg', async (targetDependency: string) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  // await page.goto('https://wordpress.org/plugins/');
  // await page.locator('#wp-block-search__input-8').fill('woocommerce');
  // await page.locator(`//input[@id="wp-block-search__input-8"]//following-sibling::button`).click();

  // https://wordpress.org/plugins/woocommerce/
  // input[id="wp-block-search__input-8"]

  await page.goto('https://wordpress.org/plugins/woocommerce/');
  console.log(await page.locator('.plugin-title').allInnerTexts());

  console.log(await page.locator(`//ul/li[contains(text(), "Version")]//following-sibling::strong`).allInnerTexts());
  console.log(await page.locator(`//ul/li[contains(text(), "WordPress version")]//following-sibling::strong`).allInnerTexts());
  console.log(await page.locator(`//ul/li[contains(text(), "PHP version")]//following-sibling::strong`).allInnerTexts());

  // console.log(await page.title());

  await context.close();
  await browser.close();

  return {
    currentVersion: '10.2',
    dep: targetDependency
  };
});
