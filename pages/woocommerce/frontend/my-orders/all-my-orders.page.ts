import WpBasePage from '@pages/base/wp-base.page';

export default class AllMyOrdersPage extends WpBasePage {
  viewButtonByOrderId(orderId: string) {
    return this.page.locator(`//td[@class="order-number"]/a[contains(text(), "${orderId}")]/../following-sibling::td[5]/a`);
  }

  async clickOnViewButtonByOrderId(orderId: string) {
    await this.viewButtonByOrderId(orderId).click();
  }
}
