import WpBasePage from '@pages/base/wp-base.page';

export default class DokanMyAccountAuthPage extends WpBasePage {
  firstNameInputField() {
    return this.page.locator(`#first-name`);
  }

  lastNameInputField() {
    return this.page.locator(`#last-name`);
  }

  shopNameInputField() {
    return this.page.locator(`#company-name`);
  }

  shopPhoneInputField() {
    return this.page.locator(`#shop-phone`);
  }

  imCustomerCheckbox() {
    return this.page.locator(`//input[@type="radio"][@value="customer"]`);
  }

  imVendorCheckbox() {
    return this.page.locator(`//input[@type="radio"][@value="seller"]`);
  }

  async clickOnImCustomerCheckbox() {
    await this.imCustomerCheckbox().click();
  }

  async clickOnImVendorCheckbox() {
    await this.imVendorCheckbox().click();
  }

  async enterFirstName(firstName: string) {
    await this.firstNameInputField().fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastNameInputField().fill(lastName);
  }

  async enterShopName(shopName: string) {
    await this.shopNameInputField().fill(shopName);
  }

  async enterShopPhoneNumber(phone: string) {
    await this.shopPhoneInputField().fill(phone);
  }
}
