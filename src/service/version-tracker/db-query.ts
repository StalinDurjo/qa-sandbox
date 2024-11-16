import { database } from '../../core/database';

export interface DependencyRecord {
  scraper_name: string;
  dependency_name: string;
  target_url: string;
  stored_data: string;
  compare_data: string;
  is_searchable: number;
}

export class DependencyDatabaseQueries {
  constructor() {}

  async getDependencyRecord(scraper: string, dependency: string): Promise<DependencyRecord[]> {
    return database.all(
      `
      SELECT * FROM dependency_version_tracker 
      WHERE scraper_name = ? AND dependency_name = ?
    `,
      [scraper, dependency]
    );
  }

  async getAllDependencyRecords(): Promise<DependencyRecord[]> {
    return database.all(`
      SELECT * FROM dependency_version_tracker
    `);
  }

  async insertDependencyRecord(record: Partial<DependencyRecord>): Promise<void> {
    const query = `
      INSERT INTO dependency_version_tracker (
        scraper_name, dependency_name, target_url, 
        stored_data, compare_data, is_searchable
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    await database.run(query, [record.scraper_name, record.dependency_name, record.target_url, record.stored_data || '', record.compare_data || '', record.is_searchable || 1]);
  }

  async updateStoredData(scraper: string, dependency: string, data: string): Promise<void> {
    await database.run(
      `
      UPDATE dependency_version_tracker
      SET stored_data = ?
      WHERE scraper_name = ? AND dependency_name = ?
    `,
      [data, scraper, dependency]
    );
  }

  async updateCompareData(scraper: string, dependency: string, data: string): Promise<void> {
    await database.run(
      `
      UPDATE dependency_version_tracker
      SET compare_data = ?
      WHERE scraper_name = ? AND dependency_name = ?
    `,
      [data, scraper, dependency]
    );
  }

  async moveCompareToStored(scraper: string, dependency: string): Promise<void> {
    await database.run(
      `
      UPDATE dependency_version_tracker
      SET stored_data = compare_data,
          compare_data = ''
      WHERE scraper_name = ? 
      AND dependency_name = ? 
      AND is_searchable = 1
    `,
      [scraper, dependency]
    );
  }

  async updateIsSearchable(scraper: string, dependency: string, setIsSearchable: string): Promise<void> {
    await database.run(
      `
      UPDATE dependency_version_tracker
      SET is_searchable = ?
      WHERE scraper_name = ? AND dependency_name = ?
    `,
      [setIsSearchable, scraper, dependency]
    );
  }
}
