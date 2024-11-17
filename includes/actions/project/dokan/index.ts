import DokanSellerSetupPage from '@pages/dokan/frontend/dokan-seller-setup/seller-setup.page';
import DokanMyAccountAuthPage from '@pages/dokan/frontend/my-accounts/my-account-auth.page';
import DokanSellingOptionsPage from '@pages/dokan/wp-admin/dokan/settings/selling-options.page';
import DokanSettingsSidebarPage from '@pages/dokan/wp-admin/dokan/settings/settings-sidebar.page';
import PageActions from '@pages/page-actions/page-actions';
import WoocommerceMyAccountAuthPage from '@pages/woocommerce/frontend/my-account/auth/my-account-auth.page';
import { database } from 'src/core/database';

export async function loginToAdmin({ actionStepName = 'login-to-admin', page, parameter: { username, password, baseUrl } }) {
  await page.goto(baseUrl + '/wp-login.php');
  const pageActions = new PageActions(page);
  await pageActions.loginToAdmin({ username, password });
}

export async function setProductStatusToPublished({ actionStepName = 'set-product-status-to-published', page, parameter: { baseUrl } }) {
  await page.goto(baseUrl + '/wp-admin/admin.php?page=dokan#/settings');

  const dokanSettingsSidebarPage = new DokanSettingsSidebarPage(page);
  const sellingOptionsPage = new DokanSellingOptionsPage(page);
  await dokanSettingsSidebarPage.clickOnSidebarMenu('Selling Options');

  if (await sellingOptionsPage.productStatusPublishedRadioElement().isVisible()) {
    await sellingOptionsPage.clickOnPublishedRadioButton();

    if (!(await page.locator(`#dokan-license-expired-modal`).isVisible())) {
      await sellingOptionsPage.clickOnSaveChanges();
    }
  }
}

export async function createVendor({ actionStepName = 'create-vendor', page, parameter: { baseUrl, password } }) {
  await page.goto(baseUrl + '/my-account/');
  const myAccountsPage = new WoocommerceMyAccountAuthPage(page);
  const dokanMyAccountsPage = new DokanMyAccountAuthPage(page);

  await dokanMyAccountsPage.clickOnImVendorCheckbox();

  const counter = await database.incrementCount();
  await myAccountsPage.enterRegisterEmail(`vendor${counter}@email.com`);
  await myAccountsPage.enterRegisterPassword(password);

  await dokanMyAccountsPage.enterFirstName(`Vendor${counter}`);
  await dokanMyAccountsPage.enterLastName(`_${counter}`);
  await dokanMyAccountsPage.enterShopName(`vendor${counter}`);
  await dokanMyAccountsPage.enterShopPhoneNumber(`0987654321`);
  await page.keyboard.press('Enter');
}

export async function completeVendorSetupWizard({ actionStepName = 'complete-vendor-setup-wizard', page }) {
  const sellerSetupPage = new DokanSellerSetupPage(page);

  await sellerSetupPage.clickOnLetsGoButton();
  await sellerSetupPage.enterStreet1('One Apple Park Way');
  await sellerSetupPage.enterCity('Cupertino');
  await sellerSetupPage.enterZipCode('95014');
  await sellerSetupPage.selectCountry('United States (US)');
  await sellerSetupPage.selectState('California');
  await sellerSetupPage.clickOnContinueButton();
  await sellerSetupPage.clickOnSkipButton();
  await sellerSetupPage.clickOnGoToDashboardButton();
}
