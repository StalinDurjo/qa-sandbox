import WpBasePage from '@pages/base/wp-base.page';
import { Page } from 'playwright/test';

const selectors = {
  usernameField: '#user_login',
  passwordField: '#user_pass'
};

export default class WpLoginPage extends WpBasePage {
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  usernameInputField() {
    return this.page.locator(selectors.usernameField);
  }

  passwordInputField() {
    return this.page.locator(selectors.passwordField);
  }

  async enterUsername(username: string) {
    await this.usernameInputField().fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInputField().fill(password);
  }

  async clickOnLogin() {
    await this.button('Log In').click();
  }
}
