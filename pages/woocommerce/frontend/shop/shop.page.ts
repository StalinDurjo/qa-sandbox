import WpBasePage from '@pages/base/wp-base.page';

export default class ShopPage extends WpBasePage {
  productTitle() {
    return this.page.locator('.woocommerce-loop-product__title');
  }

  async clickOnProductWithTitle(productTitle: string) {
    await this.productTitle().getByText(productTitle).click();
  }
}
