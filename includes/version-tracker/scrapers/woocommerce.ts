import { DependencyVersion } from '@src/service/version-tracker/scraper-registry';

export default async function woocommerceScraper({ page, targetUrl }): Promise<DependencyVersion> {
  await page.goto(targetUrl);
  const [pluginVersion] = await page.locator(`//aside//div[@class="wccom-product-box"]//a/div/p[text()="Latest version"]/following-sibling::p`).allInnerTexts();

  return {
    pluginVersion,
    wordpressVersion: '',
    phpVersion: ''
  };
}
