import WpBasePage from '@pages/base/wp-base.page';

export default class WooCommerceSiteVisibilityPage extends WpBasePage {
  comingSoonRadioElement() {
    return this.page.locator(`#inspector-radio-control-0-0`);
  }

  liveRadioElement() {
    return this.page.locator(`#inspector-radio-control-1-0`);
  }

  async clickOnLiveRadioElement() {
    await this.liveRadioElement().click();
  }
}
