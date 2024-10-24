import dependencyUpdateNotifierScraper from '../notifier-scraper';

export default dependencyUpdateNotifierScraper.add('woocommerce', async (targetDependency: string, targetUrl: string) => {
  return {
    pluginVersion: '',
    wordpressVersion: '',
    phpVersion: ''
  };
});
