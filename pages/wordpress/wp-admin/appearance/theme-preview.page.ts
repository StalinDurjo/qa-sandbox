import WpBasePage from '@pages/base/wp-base.page';

export default class WpThemePreviewPage extends WpBasePage {
  installButton() {
    return this.page.locator(`//div[contains(@class, "theme-install-overlay")]/div/div[1]/a[contains(@class, "theme-install")]`);
  }

  activateButton() {
    return this.page.locator(`//div[contains(@class, "theme-install-overlay")]/div/div[1]/a[contains(@class, "activate")]`);
  }

  async clickOnInstallButton() {
    await this.installButton().click();
  }

  async clickOnActivateButton() {
    await this.activateButton().click();
  }
}
