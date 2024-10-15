import WpBasePage from '@pages/base/wp-base.page';

export default class VendorDashboardSidebarPage extends WpBasePage {
  sidebarMenu(title: string) {
    return this.page.locator(`//li[contains(@class, "${title}")]/a`);
  }

  async clickOnOrdersTab() {
    await this.sidebarMenu('orders').click();
  }

  async clickOnProductsTab() {
    await this.sidebarMenu('products').click();
  }

  async clickOnSettingsTab() {
    await this.sidebarMenu('settings').click();
  }
}
