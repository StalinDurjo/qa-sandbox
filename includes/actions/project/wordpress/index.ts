import PageActions from '@pages/page-actions/page-actions';
import PermalinkSettingsPage from '@pages/woocommerce/wp-admin/settings/permalink-settings.page';
import WordpressSetupPage from '@pages/wordpress/wordpress-setup.page';
import WpGeneralSettingsPage from '@pages/wordpress/wp-admin/settings/general-settings.page';

export async function loginToAdmin({ actionStepName = 'login-to-admin', page, scriptParams: { username, password, baseUrl } }) {
  await page.goto(baseUrl + '/wp-login.php');
  const pageActions = new PageActions(page);
  await pageActions.loginToAdmin({ username, password });
}

export async function changePermalink({ actionStepName = 'change-permalink', page, scriptParams: { permalinkType, baseUrl } }) {
  const permalinkSettingsPage = new PermalinkSettingsPage(page);
  await page.goto(baseUrl + '/wp-admin/options-permalink.php');
  await permalinkSettingsPage.selectPermalinkStructure(permalinkType);
  await permalinkSettingsPage.clickOnSaveChanges();
}

export async function selectSetupLanguage({ actionStepName = 'select-setup-language', page, scriptParams: { language = 'English (United States)', baseUrl } }) {
  const wordpressSetupPage = new WordpressSetupPage(page);
  await page.goto(baseUrl + '/wp-admin/setup-config.php');

  // if language selector is visible, then continue with the flow
  if (await wordpressSetupPage.languageSelector().isVisible()) {
    await wordpressSetupPage.selectLanguage(language);
    await wordpressSetupPage.clickOnLanguageContinueButton();
    await page.getByText('Let’s go!').click();

    // if database setup is already complete, then installing now link shoule appear
  } else if (await wordpressSetupPage.wordpressSetupInstallingNowLink().isVisible()) {
    await wordpressSetupPage.clickOnWordpressSetupInstallingNowLink();
  }
}

export async function wordpressDatabaseSetup({ actionStepName = 'setup-wordpress-database', page, scriptParams: { databaseName, username, password, baseUrl } }) {
  const wordpressSetupPage = new WordpressSetupPage(page);

  // database name input field is used as an indicator to see if this page is visible
  // note: if this page is not visible, then the step is already complete
  if (await wordpressSetupPage.databaseNameField().isVisible()) {
    await wordpressSetupPage.enterDatabaseName(databaseName);
    await wordpressSetupPage.enterDatabaseUsername(username);
    await wordpressSetupPage.enterDatabasePassword(password);
    // await wordpressSetupPage.enterDatabasePrefix(tablePrefix);
    await page.keyboard.press('Enter');
  }

  // run the installation button should appear first time the page is visited
  if (await wordpressSetupPage.runInstallationButton().isVisible()) {
    await wordpressSetupPage.clickOnRunInstallationButton();
  }

  // if run the installation button is not clicked the first time,
  // and this page is re-visited, installing now link will be visible
  // clicking the link takes to language selection page
  if (await wordpressSetupPage.wordpressSetupInstallingNowLink().isVisible()) {
    await wordpressSetupPage.clickOnWordpressSetupInstallingNowLink();

    // if taken to language selection page, then continue with language selection process
    if (await wordpressSetupPage.languageSelector().isVisible()) {
      await wordpressSetupPage.selectLanguage('English (United States)');
      await wordpressSetupPage.clickOnLanguageContinueButton();
      await page.getByText('Let’s go!').click();
    }
  }
}

export async function wordpressAdminSiteSetup({ actionStepName = 'setup-wordpress-admin-site', page, scriptParams: { siteTitle, username, password, email, baseUrl } }) {
  const wordpressSetupPage = new WordpressSetupPage(page);
  await page.goto(baseUrl + `/wp-admin/install.php?step=1`);

  // site title field is used as an indicator to see if user is on the site admin setup page
  if (await wordpressSetupPage.siteTitleField().isVisible()) {
    await wordpressSetupPage.enterSiteTitle(siteTitle);
    await wordpressSetupPage.enterAdminUsername(username);
    await wordpressSetupPage.enterAdminPassword(password);
    await wordpressSetupPage.enterAdminEmail(email);
    await wordpressSetupPage.clickOnInstallWordpressButton();
  }
}

export async function setAnyoneCanRegister({ actionStepName = 'set-on-anyone-can-register', page, scriptParams: { baseUrl } }) {
  const generalSettingsPage = new WpGeneralSettingsPage(page);
  await page.goto(baseUrl + '/wp-admin/options-general.php');
  await generalSettingsPage.clickOnSetAnyoneCanRegister();
  await generalSettingsPage.submit('Save Changes').click();
}

export async function installAndActivateEmailLogPlugin({ actionStepName = 'install-and-activate-email-log-plugin', page, scriptParams: { baseUrl } }) {
  const pageActions = new PageActions(page);
  await pageActions.installWordpressPlugin({ baseUrl, pluginName: 'Email Log', pluginProvider: 'Sudar', activate: true });
}

export async function installPDFInvoicePlugin({ actionStepName = 'install-pdf-invoice-and-packing-plugin', page, scriptParams: { baseUrl } }) {
  const pageActions = new PageActions(page);
  await pageActions.installWordpressPlugin({ baseUrl, pluginName: 'PDF Invoices & Packing Slips for WooCommerce', pluginProvider: 'WP Overnight' });
}

export async function installAndActivateWpConsolePlugin({ actionStepName = 'install-and-activate-wp-console-plugin', page, scriptParams: { baseUrl } }) {
  const pageActions = new PageActions(page);
  await pageActions.installWordpressPlugin({ baseUrl, pluginName: 'WP Console – WordPress PHP Console powered by PsySH', pluginProvider: 'Edi Amin', activate: true });
}

export async function installDokanInvoicePlugin({ actionStepName = 'install-dokan-invoice-plugin', page, scriptParams: { baseUrl } }) {
  const pageActions = new PageActions(page);
  await pageActions.installWordpressPlugin({ baseUrl, pluginName: 'WP Console – WordPress PHP Console powered by PsySH', pluginProvider: 'Edi Amin' });
}
