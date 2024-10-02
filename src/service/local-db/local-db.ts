import { LOCAL_DATABASE } from '@src/constant';
import SQlite from '@src/lib/sqlite';

export default class LocalDB {
  private sqlite: SQlite;

  constructor() {
    this.sqlite = new SQlite(`/out/${LOCAL_DATABASE}`);
  }

  async exec(filePath: string) {
    await this.sqlite.exec(filePath);
  }
}
