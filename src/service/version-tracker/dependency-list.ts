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
    scraper: 'woocommerce',
    dependency: 'Product Add-Ons for WooCommerce',
    targetUrl: 'https://woocommerce.com/products/product-add-ons/'
  },
  {
    scraper: 'woocommerce',
    dependency: 'WooCommerce Bookings',
    targetUrl: 'https://woocommerce.com/products/woocommerce-bookings/'
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
  },
  {
    scraper: 'wp-org',
    dependency: 'Dokan Lite',
    targetUrl: 'https://wordpress.org/plugins/dokan-lite/'
  },
  {
    scraper: 'wp-org',
    dependency: 'Dokan WPML',
    targetUrl: 'https://wordpress.org/plugins/dokan-wpml/'
  },
  {
    scraper: 'wp-org',
    dependency: 'Dokan Invoice',
    targetUrl: 'https://wordpress.org/plugins/dokan-invoice/'
  },
  {
    scraper: 'wp-org',
    dependency: 'PDF Invoices & Packing Slips for WooCommerce',
    targetUrl: 'https://wordpress.org/plugins/woocommerce-pdf-invoices-packing-slips/'
  }
];
