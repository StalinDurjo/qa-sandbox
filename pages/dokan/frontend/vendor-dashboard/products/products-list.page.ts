import WpBasePage from '@pages/base/wp-base.page';

export default class VendorProductListPage extends WpBasePage {
  productTitle() {
    return this.page.locator(`//td[@data-title="Name"]/strong/a`);
  }

  async clickOnProductWithTitle(productTitle: string) {
    await this.productTitle().getByText(productTitle).click();
  }
}
