import WpBasePage from '@pages/base/wp-base.page';

export default class AddNewPluginPage extends WpBasePage {
  pluginSearchField() {
    return this.page.locator('#search-plugins');
  }

  pluginInstallNowButton(pluginName: string, provider: string) {
    return this.page.locator(
      `//h3/a[contains(text(), "${pluginName}")]/../../../div[3]/p[@class="authors"]/cite/a[text()="${provider}"]/../../../../div[2]/ul/li[1]/a[text()="Install Now"]`
    );
  }

  pluginActivatewButton(pluginName: string, provider: string) {
    return this.page.locator(
      `//h3/a[contains(text(), "${pluginName}")]/../../../div[3]/p[@class="authors"]/cite/a[text()="${provider}"]/../../../../div[2]/ul/li[1]/a[text()="Activate"]`
    );
  }

  async searchPlugin(pluginName: string) {
    await this.pluginSearchField().fill(pluginName);
  }

  async clickOnInstallNowButton(pluginName: string, provider: string) {
    await this.pluginInstallNowButton(pluginName, provider).click();
  }

  async clickOnActivateButton(pluginName: string, provider: string) {
    await this.pluginActivatewButton(pluginName, provider).click();
  }
}
