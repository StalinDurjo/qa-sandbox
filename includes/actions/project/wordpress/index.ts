import WpLoginPage from '@pages/woocommerce/wp-admin/auth/login.page';
import WpAdminSidebar from '@pages/woocommerce/wp-admin/navigation/sidebar.page';
import PermalinkSettingsPage from '@pages/woocommerce/wp-admin/settings/permalink-settings.page';
import { Page } from 'playwright';

export default class WordpressActionProject {
  async loginToAdmin(actionStepName = 'login-to-admin', page: Page, { username, password }) {
    const loginPage = new WpLoginPage(page);
    await page.goto('http://localhost/automation/wp-login.php');
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickOnLogin();

    // console.log(username);
    // console.log('Step: loginToAdmin');
  }

  async changePermalink(actionStepName = 'change-permalink', page: Page, { permalinkType }) {
    const sidebarPage = new WpAdminSidebar(page);
    const permalinkSettingsPage = new PermalinkSettingsPage(page);

    await sidebarPage.clickOnMenu('Settings');
    await sidebarPage.cliskOnSubMenu('Permalinks');
    await permalinkSettingsPage.selectPermalinkStructure(permalinkType);

    // console.log('Step: changePermalink');
  }

  async clickOnSaveChanges(actionStepName = 'click-on-save-changes', page: Page) {
    const permalinkSettingsPage = new PermalinkSettingsPage(page);
    await permalinkSettingsPage.clickOnSaveChanges();

    // console.log('Step: clickOnSaveChanges');
  }
}
