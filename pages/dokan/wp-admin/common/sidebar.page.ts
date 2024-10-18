import WpBasePage from '@pages/base/wp-base.page';

export default class WpAdminSidebar extends WpBasePage {
  sideMenu(title: string) {
    return this.page.locator('.wp-menu-name').getByText(title);
  }

  async clickOnDokanLink() {
    await this.sideMenu('Dokan').click();
  }
}
