import { LOCAL_DATABASE } from '@src/constant';
import SQlite from '@src/lib/sqlite';

export default class LocalDatabase {
  private sqlite: SQlite;

  constructor() {
    this.sqlite = new SQlite(`/out/${LOCAL_DATABASE}`);
  }

  async run(query: string, params: unknown[] = []) {
    await this.sqlite.run(query, params);
  }

  async all<T>(query: string, params: any[] = []) {
    return await this.sqlite.all<T>(query, params);
  }

  async exec(filePath: string) {
    await this.sqlite.exec(filePath);
  }
}
