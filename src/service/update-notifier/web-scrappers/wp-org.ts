import notifierScrapper from '../notifier-scrapper';

export default notifierScrapper.add('wporg', async (targetDependency: string) => {
  return {
    currentVersion: '10.2',
    dep: targetDependency
  };
});
