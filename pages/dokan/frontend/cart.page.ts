import WpBasePage from '@pages/base/wp-base.page';

export default class CartPage extends WpBasePage {
  quantityInputFieldFor(productTitle: string) {
    return this.page.locator(`//div[@class="quantity"]/label[contains(text(), "${productTitle}")]/following-sibling::input`);
    // return this.page.locator(`//a[@class="wc-block-components-product-name"][contains(text(), "${productTitle}")]/following-sibling::div[3]/div/input`);
  }

  updateCartButton() {
    return this.page.locator('//button[@name="update_cart"]');
  }

  quantityErrorElement() {
    return this.page.locator('//td[@class="product-quantity"]/div[@class="required"]');
  }

  woocommerceErrorMessage() {
    return this.page.locator('//div[@class="woocommerce-notices-wrapper"]/ul[@class="woocommerce-error"]/li');
  }

  woocommerceMessage() {
    return this.page.locator(`.woocommerce-message`);
  }

  checkoutButton() {
    return this.page.locator(`.checkout-button`);
  }

  async enterQuantityValue(productTitle: string, quantityValue: string) {
    await this.quantityInputFieldFor(productTitle).fill(quantityValue);
  }

  async clickOnUpdateCartButton() {
    await this.updateCartButton().click();
  }

  async clickOnProceedToCheckoutButton() {
    await this.checkoutButton().click();
  }
}
