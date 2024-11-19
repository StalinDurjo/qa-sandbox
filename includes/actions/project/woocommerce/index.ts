import DokanMyAccountAuthPage from '@pages/dokan/frontend/my-accounts/my-account-auth.page';
import PageActions from '@pages/page-actions/page-actions';
import MyAccountAuthPage from '@pages/woocommerce/frontend/my-account/auth/my-account-auth.page';
import WpLoginPage from '@pages/woocommerce/wp-admin/auth/login.page';
import WooCommerceSiteVisibilityPage from '@pages/woocommerce/wp-admin/settings/site-visibility.page';
import WoocommerceAccountsPrivacyPage from '@pages/woocommerce/wp-admin/woocommerce/settings/accounts-privacy.page';
import WoocommerceGeneralSettingsPage from '@pages/woocommerce/wp-admin/woocommerce/settings/general.page';
import WpThemePreviewPage from '@pages/wordpress/wp-admin/appearance/theme-preview.page';
import { database } from 'src/core/database';

export async function loginToAdmin({ actionStepName = 'login-to-admin', page, parameter: { username, password, baseUrl } }) {
  const loginPage = new WpLoginPage(page);
  await page.goto(baseUrl + '/wp-login.php');
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
  await loginPage.clickOnLogin();
}

export async function installAndActivateStorefrontTheme({ actionStepName = 'install-and-activate-storefront-theme', page, parameter: { baseUrl } }) {
  const themePreviewPage = new WpThemePreviewPage(page);
  await page.goto(`${baseUrl}/wp-admin/theme-install.php?theme=storefront`, { waitUntil: 'networkidle' });

  // install and activate theme
  if (await themePreviewPage.installButton().isVisible()) {
    await themePreviewPage.clickOnInstallButton();
    await themePreviewPage.clickOnActivateButton();

    // if theme is installed but not activated, then click on activate button
  } else if (await themePreviewPage.activateButton().isVisible()) {
    await themePreviewPage.clickOnActivateButton();
  }
}

export async function installAndActivateWoocommercePlugin({ actionStepName = 'install-and-activate-woocommerce-plugin', page, parameter: { baseUrl } }) {
  const pageActions = new PageActions(page);
  await pageActions.installWordpressPlugin({ baseUrl, pluginName: 'WooCommerce', pluginProvider: 'Automattic', activate: true });
}

export async function disableSendPasswordSetupLink({ actionStepName = 'disable-send-password-setup-link', page, parameter: { baseUrl } }) {
  const accountsAndPrivacyPage = new WoocommerceAccountsPrivacyPage(page);
  await page.goto(`${baseUrl}/wp-admin/admin.php?page=wc-settings&tab=account`);
  const isMyAccountChecked = await accountsAndPrivacyPage.accountCreationOnMyAccountCheckbox().isChecked();

  if (!isMyAccountChecked) {
    await accountsAndPrivacyPage.clickOnAccountCreationCheckbox();
  }

  const isSendPasswordLinkChecked = await accountsAndPrivacyPage.sendPasswordSetupLinkCheckbox().isChecked();

  if (isSendPasswordLinkChecked) {
    await accountsAndPrivacyPage.clickOnSendPasswordSetupLinkCheckbox();
  }

  await accountsAndPrivacyPage.clickOnSaveChanges();
}

export async function enableTaxRates({ actionStepName = 'enable-tax-rates', page, parameter: { baseUrl } }) {
  const generalSettingsPage = new WoocommerceGeneralSettingsPage(page);
  await page.goto(`${baseUrl}/wp-admin/admin.php?page=wc-settings&tab=general`);

  const isEnableTaxChecked = await generalSettingsPage.enableTaxRatesCheckbox().isChecked();

  if (!isEnableTaxChecked) {
    await generalSettingsPage.clickOnEnableTaxRatesCheckbox();
  }

  await generalSettingsPage.clickOnSaveChanges();
}

export async function setSiteVisibilityToLive({ actionStepName = 'set-site-visibility-to-live', page, parameter: { baseUrl } }) {
  await page.goto(baseUrl + '/wp-admin/admin.php?page=wc-settings&tab=site-visibility');
  const woocommerceSiteVisibilityPage = new WooCommerceSiteVisibilityPage(page);
  await woocommerceSiteVisibilityPage.clickOnLiveRadioElement();
  await woocommerceSiteVisibilityPage.clickOnSaveChanges();
}

export async function createCustomer({ actionStepName = 'create-customer', page, parameter: { baseUrl } }) {
  await page.goto(baseUrl + '/my-account/');
  const myAccountsPage = new MyAccountAuthPage(page);
  const dokanMyAccountsPage = new DokanMyAccountAuthPage(page);

  if (await dokanMyAccountsPage.imCustomerCheckbox().isVisible()) {
    await dokanMyAccountsPage.clickOnImCustomerCheckbox();
  }

  const counter = await database.incrementCount();
  await myAccountsPage.enterRegisterEmail(`customer${counter}@email.com`);
  await myAccountsPage.enterRegisterPassword('01Test01!');
  await page.keyboard.press('Enter');
}
