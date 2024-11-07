import WpBasePage from '@pages/base/wp-base.page';

export default class MyAccountAuthPage extends WpBasePage {
  woocommerceErrorUlElement() {
    return this.page.locator(`//ul[@class="woocommerce-error"]`);
  }

  usernameInputField() {
    return this.page.locator('#username');
  }

  passwordInputField() {
    return this.page.locator('#password');
  }

  registerEmailInputFIeld() {
    return this.page.locator('#reg_email');
  }

  registerPasswordInputFIeld() {
    return this.page.locator('#reg_password');
  }

  loginButton() {
    return this.page.locator('//button[@name="login"]');
  }

  async enterUsername(username: string) {
    await this.usernameInputField().fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInputField().fill(password);
  }

  async clickOnLoginButton() {
    await this.loginButton().click();
  }

  async enterRegisterEmail(email: string) {
    await this.registerEmailInputFIeld().fill(email);
  }

  async enterRegisterPassword(password: string) {
    await this.registerPasswordInputFIeld().fill(password);
  }
}
