import WpBasePage from '@pages/base/wp-base.page';

export default class DokanSellerSetupPage extends WpBasePage {
  letsGoButton() {
    return this.page.locator(`//p/a[text()="Let's Go!"]`);
  }

  notRightNowButton() {
    return this.page.locator(`//p/a[text()="Not right now"]`);
  }

  street1InputField() {
    return this.page.locator(`//input[@id="address[street_1]"]`);
  }

  street2InputField() {
    return this.page.locator(`//input[@id="address[street_2"]`);
  }

  cityInputField() {
    return this.page.locator(`//input[@id="address[city]"]`);
  }

  zipCodeInputField() {
    return this.page.locator(`//input[@id="address[zip]"]`);
  }

  countrySelectField() {
    return this.page.locator(`#select2-addresscountry-container`);
  }

  dropdownSearchField() {
    return this.page.locator(`.select2-search__field`);
  }

  highlightedListItemByName(name: string) {
    return this.page.locator(`//li[@class="select2-results__option select2-results__option--highlighted"][text()="${name}"]`);
  }

  stateSelectSearchField() {
    return this.page.locator(`#select2-calc_shipping_state-container`);
  }

  continueButton() {
    return this.page.locator(`//input[@type="button"][@value="Continue"]`);
  }

  stepSkipButton() {
    return this.page.locator(`//a[text()="Skip this step"]`);
  }

  gotoStoreDashboardButton() {
    return this.page.locator(`//a[text()="Go to your Store Dashboard!"]`);
  }

  async clickOnLetsGoButton() {
    await this.letsGoButton().click();
  }

  async clickOnNotRightNowButton() {
    await this.notRightNowButton().click();
  }

  async enterStreet1(street: string) {
    await this.street1InputField().fill(street);
  }

  async enterStreet2(street: string) {
    await this.street2InputField().fill(street);
  }

  async enterCity(city: string) {
    await this.cityInputField().fill(city);
  }

  async enterZipCode(zipCode: string) {
    await this.zipCodeInputField().fill(zipCode);
  }

  async selectCountry(country: string) {
    await this.countrySelectField().click();
    await this.dropdownSearchField().fill(country);
    await this.highlightedListItemByName(country).click();
  }

  async selectState(state: string) {
    await this.stateSelectSearchField().click();
    await this.dropdownSearchField().fill(state);
    await this.highlightedListItemByName(state).click();
  }

  async clickOnContinueButton() {
    await this.continueButton().click();
  }

  async clickOnSkipButton() {
    await this.stepSkipButton().click();
  }

  async clickOnGoToDashboardButton() {
    await this.gotoStoreDashboardButton().click();
  }
}
