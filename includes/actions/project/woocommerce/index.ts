import DokanMyAccountAuthPage from '@pages/dokan/frontend/my-accounts/my-account-auth.page';
import PageActions from '@pages/page-actions/page-actions';
import MyAccountAuthPage from '@pages/woocommerce/frontend/my-account/auth/my-account-auth.page';
import WpLoginPage from '@pages/woocommerce/wp-admin/auth/login.page';
import WooCommerceSiteVisibilityPage from '@pages/woocommerce/wp-admin/settings/site-visibility.page';
import WoocommerceAccountsPrivacyPage from '@pages/woocommerce/wp-admin/woocommerce/settings/accounts-privacy.page';
import WoocommerceGeneralSettingsPage from '@pages/woocommerce/wp-admin/woocommerce/settings/general.page';
import WpThemePreviewPage from '@pages/wordpress/wp-admin/appearance/theme-preview.page';
import AddNewPluginPage from '@pages/wordpress/wp-admin/plugins/add-new-plugin.page';
import { database } from '@src/service/database';
import Mocker from '@src/service/mocker/mocker';
import { Page } from 'playwright';

// const baseUrl = process.env.ACTION_PROJECT_BASE_URL;

export default class WoocommerceActionProject {
  async loginToAdmin(actionStepName = 'login-to-admin', page: Page, { username, password, baseUrl }) {
    const loginPage = new WpLoginPage(page);
    await page.goto(baseUrl + '/wp-login.php');
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickOnLogin();
  }

  async installAndActivateStorefrontTheme(actionStepName = 'install-and-activate-storefront-theme', page: Page, { baseUrl }) {
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

  async installAndActivateWoocommercePlugin(actionStepName = 'install-and-activate-woocommerce-plugin', page: Page, { baseUrl }) {
    const pageActions = new PageActions(page);
    await pageActions.installWordpressPlugin({ baseUrl, pluginName: 'WooCommerce', pluginProvider: 'Automattic', activate: true });
  }

  async disableSendPasswordSetupLink(actionStepName = 'disable-send-password-setup-link', page: Page, { baseUrl }) {
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

  async enableTaxRates(actionStepName = 'enable-tax-rates', page: Page, { baseUrl }) {
    const generalSettingsPage = new WoocommerceGeneralSettingsPage(page);
    await page.goto(`${baseUrl}/wp-admin/admin.php?page=wc-settings&tab=general`);

    const isEnableTaxChecked = await generalSettingsPage.enableTaxRatesCheckbox().isChecked();

    if (!isEnableTaxChecked) {
      await generalSettingsPage.clickOnEnableTaxRatesCheckbox();
    }

    await generalSettingsPage.clickOnSaveChanges();
  }

  async setSiteVisibilityToLive(actionStepName = 'set-site-visibility-to-live', page: Page, { baseUrl }) {
    await page.goto(baseUrl + '/wp-admin/admin.php?page=wc-settings&tab=site-visibility');
    const woocommerceSiteVisibilityPage = new WooCommerceSiteVisibilityPage(page);
    await woocommerceSiteVisibilityPage.clickOnLiveRadioElement();
    await woocommerceSiteVisibilityPage.clickOnSaveChanges();
  }

  async createCustomer(actionStepName = 'create-customer', page: Page, { baseUrl }) {
    await page.goto(baseUrl + '/my-account/');
    const myAccountsPage = new MyAccountAuthPage(page);
    const dokanMyAccountsPage = new DokanMyAccountAuthPage(page);

    if (await dokanMyAccountsPage.imCustomerCheckbox().isVisible()) {
      await dokanMyAccountsPage.clickOnImCustomerCheckbox();
    }

    await myAccountsPage.enterRegisterEmail('customer1@email.com');
    await myAccountsPage.enterRegisterPassword('01Testing01!');
    await page.keyboard.press('Enter');

    if (myAccountsPage.woocommerceErrorUlElement().isVisible()) {
      const counter = await database.incrementCount();
      await myAccountsPage.enterRegisterEmail(`customer${counter + 1}@email.com`);
      await myAccountsPage.enterRegisterPassword('01Testing01!');
      await page.keyboard.press('Enter');
    }
  }
}
