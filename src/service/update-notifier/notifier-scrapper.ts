import { searchFiles } from '@src/lib/util/util';

class NotifierScrapper {
  private scrapperList: Map<string, Function> = new Map();

  add(name: string, callback: Function) {
    this.scrapperList.set(name, callback);
  }

  get(scrapperName: string) {
    return this.scrapperList.get(scrapperName);
  }

  getFullList() {
    return this.scrapperList;
  }

  async initialize() {
    const path = __dirname + `/web-scrappers/`;
    const files = searchFiles(path, ['.ts']);

    for (const file of files) {
      const module = await import(file);
      module.default;
    }
  }
}

const notifierScrapper = new NotifierScrapper();
export default notifierScrapper;
