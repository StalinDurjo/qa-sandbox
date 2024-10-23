import dependencyUpdateNotifierScraper from '../notifier-scraper';

export default dependencyUpdateNotifierScraper.add('woocommerce', async (targetDependency: string) => {
  return {
    currentVersion: '6.10.2',
    dep: targetDependency
  };
});
