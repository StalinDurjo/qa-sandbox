import WpBasePage from '@pages/base/wp-base.page';
import { Page } from 'playwright';

export default class PermalinkSettingsPage extends WpBasePage {
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  permalinkStructureElement(permalink: string) {
    return this.page.locator(`//div/input[@name="selection"]/following-sibling::div/label`).getByText(permalink);
  }

  async selectPermalinkStructure(permalink: string) {
    await this.permalinkStructureElement(permalink).click();
  }
}
