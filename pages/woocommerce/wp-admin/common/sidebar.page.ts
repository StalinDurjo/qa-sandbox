import WpBasePage from '@pages/base/wp-base.page';

export default class WpAdminSidebar extends WpBasePage {
  sideMenu(title: string) {
    return this.page.locator('.wp-menu-name').getByText(title);
  }

  async clickOnProductsLink() {
    await this.sideMenu('Products').click();
  }
}
