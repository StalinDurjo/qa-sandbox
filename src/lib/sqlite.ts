import { readFileSync } from 'fs';
import sqlite3, { Database } from 'sqlite3';

export default class SQlite {
  private db: Database = null;
  private databaseFilePath: string;

  constructor(databaseFilePath: string) {
    this.databaseFilePath = databaseFilePath;
  }

  async connect() {
    if (!this.db) {
      this.db = await new Promise<Database>((resolve, reject) => {
        const db = new sqlite3.Database(process.cwd() + this.databaseFilePath, sqlite3.OPEN_READWRITE, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(db);
          }
        });
      });
    }
    return this.db;
  }

  async close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  async run(query: string, params: unknown[] = []) {
    await this.connect();
    return new Promise((resolve, reject) => {
      resolve(this.db.run(query, params));
    });
  }

  async all<T>(query: string, params: any[] = []) {
    await this.connect();

    return new Promise<T[]>((resolve, reject) => {
      this.db.all(query, params, (error, rows: T[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async exec(filePath: string) {
    try {
      await this.connect();

      const sql = readFileSync(filePath, 'utf8');

      return new Promise<void>((resolve, reject) => {
        this.db.exec(sql, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
