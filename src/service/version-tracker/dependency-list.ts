export interface DependencyConfig {
  scraper: string;
  dependency: string;
  targetUrl: string;
}

export const dependencies: DependencyConfig[] = [
  {
    scraper: 'woocommerce',
    dependency: 'Stripe for WooCommerce',
    targetUrl: 'https://woocommerce.com/products/stripe/'
  },
  {
    scraper: 'wp-org',
    dependency: 'WooCommerce',
    targetUrl: 'https://wordpress.org/plugins/woocommerce/'
  },
  {
    scraper: 'wp-org',
    dependency: 'Contact Form 7',
    targetUrl: 'https://wordpress.org/plugins/contact-form-7/'
  }
];
