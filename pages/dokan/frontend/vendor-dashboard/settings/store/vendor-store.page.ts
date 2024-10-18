import WpBasePage from '@pages/base/wp-base.page';

export default class VendorStoreSettingsPage extends WpBasePage {
  minimumOrderAmountInputField() {
    return this.page.locator('#min_amount_to_order');
  }

  maximumOrderAmountInputField() {
    return this.page.locator('#max_amount_to_order');
  }

  updateSettingsButton() {
    return this.page.locator(`//input[@name="dokan_update_store_settings"]`);
  }

  async enterMinimumOrderAmount(amount: string) {
    await this.minimumOrderAmountInputField().fill(amount);
  }

  async enterMaximumOrderAmount(amount: string) {
    await this.maximumOrderAmountInputField().fill(amount);
  }

  async clickOnUpdateSettingsButton() {
    await this.updateSettingsButton().click();
  }
}
