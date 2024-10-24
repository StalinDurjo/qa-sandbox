import WpBasePage from '@pages/base/wp-base.page';

export default class VendorProductAddEditPage extends WpBasePage {
  simpleProductMinQtyInputField() {
    return this.page.locator('#min_quantity');
  }

  simpleProductMaxQtyInputField() {
    return this.page.locator('#max_quantity');
  }

  productStatusSelectField() {
    return this.page.locator('#post_status');
  }

  saveProductButton() {
    return this.page.locator('#publish');
  }

  async enterSimpleProductMinQty(quantity: string) {
    await this.simpleProductMinQtyInputField().fill(quantity);
  }

  async enterSimpleProductMaxQty(quantity: string) {
    await this.simpleProductMaxQtyInputField().fill(quantity);
  }

  async selectProductStatus(status: 'publish' | 'draft' | 'pending') {
    await this.productStatusSelectField().selectOption(status);
  }

  async clickOnSaveProduct() {
    await this.saveProductButton().click();
  }
}
