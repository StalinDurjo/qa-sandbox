import WpBasePage from '@pages/base/wp-base.page';

export default class WoocommerceGeneralSettingsPage extends WpBasePage {
  enableTaxRatesCheckbox() {
    return this.page.locator('#woocommerce_calc_taxes');
  }

  async clickOnEnableTaxRatesCheckbox() {
    await this.enableTaxRatesCheckbox().click();
  }
}
