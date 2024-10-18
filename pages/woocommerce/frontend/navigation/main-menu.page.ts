import WpBasePage from '@pages/base/wp-base.page';

export default class StorefrontMainMenu extends WpBasePage {
  cartContentLink() {
    return this.page.locator('.cart-contents');
  }

  async clickOnCartContentLink() {
    await this.cartContentLink().click();
  }
}
