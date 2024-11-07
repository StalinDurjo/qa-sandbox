import WpBasePage from '@pages/base/wp-base.page';

export default class DokanSettingsSidebarPage extends WpBasePage {
  sidebarMenu(title: string) {
    return this.page.locator(`//div[@class="dokan-settings-wrap"]/div[1]/div/div[@class="nav-tab"]/div/div[1][text()="${title}"]`);
  }

  async clickOnSidebarMenu(title: string) {
    await this.sidebarMenu(title).click();
  }
}
