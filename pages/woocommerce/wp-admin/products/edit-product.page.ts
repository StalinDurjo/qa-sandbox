import WpBasePage from '@pages/base/wp-base.page';

export default class EditProductPage extends WpBasePage {
  publishButton() {
    return this.page.locator('#publish');
  }

  async clickOnPublishButton() {
    await this.publishButton().click();
  }
}
