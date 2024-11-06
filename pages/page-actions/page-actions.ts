import WpBasePage from '@pages/base/wp-base.page';
import AddNewPluginPage from '@pages/wordpress/wp-admin/plugins/add-new-plugin.page';
import { Page } from 'playwright';

export default class PageActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async installWordpressPlugin({ baseUrl, pluginName, pluginProvider, activate = false }: { baseUrl: string; pluginName: string; pluginProvider: string; activate?: boolean }) {
    this.page.setDefaultTimeout(60 * 10000);

    const addNewPluginPage = new AddNewPluginPage(this.page);
    await this.page.goto(`${baseUrl}/wp-admin/plugin-install.php`);
    await addNewPluginPage.searchPlugin(pluginName);

    await this.page.waitForSelector('.spinner'); // wait for spinner to be visible
    await this.page.waitForSelector('.spinner', { state: 'hidden' }); // wait for spinner to be not visible

    // if install now button is visible, then install and activate the plugin
    if (await addNewPluginPage.pluginInstallNowButton(pluginName, pluginProvider).isVisible()) {
      await addNewPluginPage.clickOnInstallNowButton(pluginName, pluginProvider);
      if (activate) await addNewPluginPage.clickOnActivateButton(pluginName, pluginProvider);

      // if activate button is visible, that means plugin is already installed
      // in that case, activate the plugin if `activate` is true
    } else if (activate && (await addNewPluginPage.pluginActivatewButton(pluginName, pluginProvider).isVisible())) {
      await addNewPluginPage.clickOnActivateButton(pluginName, pluginProvider);
    }
  }
}
