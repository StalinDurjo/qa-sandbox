import WpLoginPage from '@pages/woocommerce/wp-admin/auth/login.page';
import WpAdminSidebar from '@pages/woocommerce/wp-admin/navigation/sidebar.page';
import PermalinkSettingsPage from '@pages/woocommerce/wp-admin/settings/permalink-settings.page';
import { Page } from 'playwright';

export default class WordpressActionProject {
  async loginToAdmin(page: Page, { username, password }) {
    const loginPage = new WpLoginPage(page);
    await page.goto('http://localhost/automation/wp-login.php');
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickOnLogin();
  }

  async changePermalink(page: Page, { permalinkType }) {
    const sidebarPage = new WpAdminSidebar(page);
    const permalinkSettingsPage = new PermalinkSettingsPage(page);

    await sidebarPage.clickOnMenu('Settings');
    await sidebarPage.cliskOnSubMenu('Permalinks');
    await permalinkSettingsPage.selectPermalinkStructure(permalinkType);
  }

  async clickOnSaveChanges(page: Page) {
    const permalinkSettingsPage = new PermalinkSettingsPage(page);
    await permalinkSettingsPage.clickOnSaveChanges();
  }
}
