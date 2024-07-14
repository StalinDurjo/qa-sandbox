import { Browser, BrowserContext, chromium, Page } from 'playwright';

export default class BrowserUtil {
  private browser: Browser;
  private context: BrowserContext;
  private page: Page;

  async createInstance() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    return (this.page = await this.context.newPage());
  }

  async closeInstance() {
    if (this.page) {
      await this.page.close();
    }

    if (this.context) {
      await this.context.close();
    }

    if (this.browser) {
      await this.browser.close();
    }
  }
}
