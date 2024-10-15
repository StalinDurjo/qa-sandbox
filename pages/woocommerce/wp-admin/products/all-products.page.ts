import WpBasePage from '@pages/base/wp-base.page';

export default class AllProductsPage extends WpBasePage {
  productTitleById(productId: string) {
    return this.page.locator(`//tr[@id="post-${productId}"]/td[2]/strong/a`);
  }

  async clickOnProductTitleById(productId: string) {
    await this.productTitleById(productId).click();
  }
}
