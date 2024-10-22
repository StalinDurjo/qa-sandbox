import notifierScrapper from '../notifier-scrapper';

export default notifierScrapper.add('woocommerce', async (targetDependency: string) => {
  return {
    currentVersion: '6.10.2',
    dep: targetDependency
  };
});
