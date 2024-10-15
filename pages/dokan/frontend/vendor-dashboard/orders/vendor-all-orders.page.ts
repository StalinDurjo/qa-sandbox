import WpBasePage from '@pages/base/wp-base.page';

export default class VendorAllOrdersPage extends WpBasePage {
  orderTitleById(orderId: string) {
    return this.page.locator(`//td[@data-title="Order"]/a/strong[text()="Order ${orderId}"]`);
  }

  async clickOnOrderById(orderId: string) {
    await this.orderTitleById(orderId).click();
  }
}
