import WpBasePage from '@pages/base/wp-base.page';

export default class WoocommerceAccountsPrivacyPage extends WpBasePage {
  accountCreationOnMyAccountCheckbox() {
    return this.page.locator('#woocommerce_enable_myaccount_registration');
  }

  sendPasswordSetupLinkCheckbox() {
    return this.page.locator('#woocommerce_registration_generate_password');
  }

  async clickOnAccountCreationCheckbox() {
    await this.accountCreationOnMyAccountCheckbox().click();
  }

  async clickOnSendPasswordSetupLinkCheckbox() {
    await this.sendPasswordSetupLinkCheckbox().click();
  }
}
