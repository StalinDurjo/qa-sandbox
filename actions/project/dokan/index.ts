import WpLoginPage from '@pages/woocommerce/wp-admin/auth/login.page';
import { Page } from 'playwright';

export default class DokanActionProject {
  async createVendor(page: Page, { username, password }) {
    const loginPage = new WpLoginPage(page);
    await page.goto('http://dokan.test/my-account/');
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickOnLogin();

    // check im vendor
    // enter email
    // enter password
    // enter firstname
    // enter lastname
    // enter shopname
    // enter phonenumber
    // click on register

    //
  }
}
