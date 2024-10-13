import { LOCAL_DATABASE } from '@src/constant';
import SQlite from '@src/lib/sqlite';

export default class Database {
  private sqlite: SQlite;

  constructor() {
    this.sqlite = new SQlite(`/out/${LOCAL_DATABASE}`);
  }

  async run(query: string, params: unknown[] = []): Promise<void> {
    try {
      await this.sqlite.run(query, params);
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async all<T>(query: string, params: unknown[] = []): Promise<T[]> {
    try {
      return await this.sqlite.all<T>(query, params);
    } catch (error) {
      console.error('Error fetching results:', error);
      throw error;
    }
  }

  async exec(filePath: string): Promise<void> {
    try {
      await this.sqlite.exec(filePath);
    } catch (error) {
      console.error('Error executing SQL file:', error);
      throw error;
    }
  }

  async incrementCount(): Promise<number> {
    try {
      await this.run(`
        INSERT INTO counter (value)
        SELECT 0
        WHERE NOT EXISTS (SELECT 1 FROM counter);
      `);

      const result = await this.all<{ value: number }>(`
        UPDATE counter
        SET value = value + 1
        RETURNING value;
      `);

      return result[0]?.value ?? 0;
    } catch (error) {
      console.error('Error incrementing count:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      await this.sqlite.close();
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }
}
