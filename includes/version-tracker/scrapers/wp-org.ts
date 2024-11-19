import { DependencyVersion } from '@src/service/version-tracker/scraper-registry';

export default async function wporgScraper({ page, targetUrl }): Promise<DependencyVersion> {
  await page.goto(targetUrl);
  const [pluginVersion] = await page.locator(`//ul/li[contains(text(), "Version")]//following-sibling::strong`).allInnerTexts();
  const [wordpressVersion] = await page.locator(`//ul/li[contains(text(), "WordPress version")]//following-sibling::strong`).allInnerTexts();
  const [phpVersion] = await page.locator(`//ul/li[contains(text(), "PHP version")]//following-sibling::strong`).allInnerTexts();

  return { pluginVersion, wordpressVersion, phpVersion };
}
