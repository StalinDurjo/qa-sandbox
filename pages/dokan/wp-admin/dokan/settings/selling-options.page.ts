import WpBasePage from '@pages/base/wp-base.page';

export default class DokanSellingOptionsPage extends WpBasePage {
  productStatusPublishedRadioElement() {
    return this.page.locator(`//h3[contains(text(), "Product Status")]/../following-sibling::div//input[@id="0-publish-product_status"]/..`);
  }

  productStatusPendingReviewRadioElement() {
    return this.page.locator(`//h3[contains(text(), "Product Status")]/../following-sibling::div//input[@id="1-pending-product_status"]/..`);
  }

  async clickOnPublishedRadioButton() {
    await this.productStatusPublishedRadioElement().click();
  }
}
