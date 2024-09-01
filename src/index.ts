import '@testConfig';
import { initServer } from './server/server';
import '../actions/register';
import BrowserUtil from './lib/browser';
import action from './service/action/action';
import WpLoginPage from '@pages/woocommerce/wp-admin/auth/login.page';

(async function main() {
  // start local server
  await initServer();

  // await sandbox();
})();

async function sandbox() {
  const browser = new BrowserUtil();
  const page = await browser.createInstance();

  const loginPage = new WpLoginPage(page);
  await page.goto('http://localhost/automation/wp-login.php');
  await loginPage.enterUsername('admin');
  await loginPage.enterPassword('admin@email.com');
  await loginPage.clickOnLogin();
  await page.locator('.wp-menu-name').getByText('Settings').click();
  await page.locator('.wp-submenu > li > a').getByText('Permalinks').click();
  await page.locator(`//div/input[@name="selection"]/following-sibling::div/label`).getByText('Post name').click();
  await loginPage.clickOnSaveChanges();

  await page.waitForTimeout(4000);

  await browser.closeInstance();
}
