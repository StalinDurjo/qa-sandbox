import WpBasePage from '@pages/base/wp-base.page';
import { Page } from 'playwright';

export default class WordpressSetupPage extends WpBasePage {
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  languageSelector() {
    return this.page.locator('#language');
  }

  languageContinueButton() {
    return this.page.locator('#language-continue');
  }

  databaseNameField() {
    return this.page.locator('#dbname');
  }

  databaseUsernameField() {
    return this.page.locator('#uname');
  }

  databasePasswordField() {
    return this.page.locator('#pwd');
  }

  databasePrefixField() {
    return this.page.locator('#prefix');
  }

  siteTitleField() {
    return this.page.locator('#weblog_title');
  }

  adminUsernameField() {
    return this.page.locator('#user_login');
  }

  adminPasswordField() {
    return this.page.locator('#pass1');
  }

  adminEmailField() {
    return this.page.locator('#admin_email');
  }

  runInstallationButton() {
    return this.page.locator(`//p[@class="step"]/a`);
  }

  wordpressSetupInstallingNowLink() {
    return this.page.locator(`//p/code/following-sibling::a[text()="installing now"]`);
  }

  installWordpressButton() {
    return this.page.locator(`//p[@class="step"]/input[@value="Install WordPress"]`);
  }

  async selectLanguage(language: string) {
    await this.languageSelector().selectOption(language);
  }

  async clickOnLanguageContinueButton() {
    await this.languageContinueButton().click();
  }

  async enterDatabaseName(databaseName: string) {
    await this.databaseNameField().fill(databaseName);
  }

  async enterDatabaseUsername(username: string) {
    await this.databaseUsernameField().fill(username);
  }

  async enterDatabasePassword(password: string) {
    await this.databasePasswordField().fill(password);
  }

  async enterDatabasePrefix(prefix: string) {
    await this.databasePrefixField().clear();
    await this.databasePrefixField().fill(prefix);
  }

  async enterSiteTitle(title: string) {
    await this.siteTitleField().fill(title);
  }

  async enterAdminUsername(username: string) {
    await this.adminUsernameField().fill(username);
  }

  async enterAdminPassword(password: string) {
    await this.adminPasswordField().clear();
    await this.adminPasswordField().fill(password);
  }

  async enterAdminEmail(email: string) {
    await this.adminEmailField().fill(email);
  }

  async clickOnRunInstallationButton() {
    await this.runInstallationButton().click();
  }

  async clickOnWordpressSetupInstallingNowLink() {
    await this.wordpressSetupInstallingNowLink().click();
  }

  async clickOnInstallWordpressButton() {
    await this.installWordpressButton().click();
  }
}
