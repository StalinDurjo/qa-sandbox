import { Page } from 'playwright';

export default class WpBasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  button(title: string) {
    return this.page.getByRole('button', { name: title, exact: true });
  }

  submit(title: string) {
    return this.page.locator('#submit').and(this.page.getByText(title));
  }

  pageTitleAction(title: string) {
    return this.page.locator('.page-title-action').and(this.page.getByText(title));
  }

  async clickOnSaveChanges() {
    await this.submit('Save Changes').click();
  }
}