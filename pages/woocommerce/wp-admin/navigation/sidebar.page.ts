import WpBasePage from '@pages/base/wp-base.page';
import { Page } from 'playwright';

export default class WpAdminSidebar extends WpBasePage {
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  menuTitle(menuTitle: string) {
    return this.page.locator('.wp-menu-name').getByText(menuTitle);
  }

  subMenuTitle(subMenuTitle: string) {
    return this.page.locator('.wp-submenu > li > a').getByText(subMenuTitle);
  }

  async clickOnMenu(menuTitle: string) {
    await this.menuTitle(menuTitle).click();
  }

  async cliskOnSubMenu(subMenuTitle: string) {
    await this.subMenuTitle(subMenuTitle).click();
  }
}
