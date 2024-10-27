import WpBasePage from '@pages/base/wp-base.page';

export default class WpGeneralSettingsPage extends WpBasePage {
  anyoneCanRegisterCheckbox() {
    return this.page.locator('#users_can_register');
  }

  async clickOnSetAnyoneCanRegister() {
    await this.anyoneCanRegisterCheckbox().click();
  }
}
