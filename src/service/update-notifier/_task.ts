import { Database } from 'sqlite3';

// Type for the data returned by web scraping tasks
type ScrapedData = any; // Replace 'any' with a more specific type if known

interface TaskConfig<T> {
  name: string;
  function: () => Promise<T>;
}

interface TaskInfo {
  lastRun?: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error?: string;
}

interface ManagedTask<T> extends TaskConfig<T> {
  info: TaskInfo;
  data?: T;
}

export class TaskManagerService {
  private tasks: Map<string, ManagedTask<ScrapedData>> = new Map();
  private taskQueue: string[] = [];
  private db: Database; // Placeholder for SQLite database

  constructor() {
    // Initialize SQLite database (placeholder)
    this.db = new Database(':memory:'); // In-memory database for demonstration
  }

  addTask(config: TaskConfig<ScrapedData>): void {
    if (this.tasks.has(config.name)) {
      throw new Error(`Task with name ${config.name} already exists`);
    }

    const task: ManagedTask<ScrapedData> = {
      ...config,
      info: { status: 'pending' }
    };
    this.tasks.set(config.name, task);
    this.taskQueue.push(config.name);
  }

  async executeTask(taskName: string): Promise<void> {
    const task = this.tasks.get(taskName);
    if (!task) {
      throw new Error(`Task ${taskName} not found`);
    }

    task.info.status = 'running';
    task.info.lastRun = new Date();

    try {
      const scrapedData = await task.function();
      task.data = scrapedData;
      task.info.status = 'completed';

      // Compare scraped data with database
      await this.compareAndUpdateData(taskName, scrapedData);
    } catch (error) {
      console.error(`Error executing task ${taskName}:`, error);
      task.info.status = 'failed';
      task.info.error = error.message;
    }
  }

  private async compareAndUpdateData(taskName: string, newData: ScrapedData): Promise<void> {
    // Placeholder for SQLite data comparison and update logic
    const existingData = await this.getExistingDataFromDatabase(taskName);

    if (this.isDataDifferent(existingData, newData)) {
      await this.updateDatabase(taskName, newData);
      await this.performAdditionalActions(taskName, newData);
    }
  }

  private async getExistingDataFromDatabase(taskName: string): Promise<ScrapedData> {
    return new Promise((resolve) => {
      // Placeholder: Replace with actual SQLite query
      this.db.get(`SELECT data FROM scraped_data WHERE task_name = ?`, [taskName], (err, row) => {
        // resolve(row ? row.data : null);
      });
    });
  }

  private isDataDifferent(existingData: ScrapedData, newData: ScrapedData): boolean {
    // Implement comparison logic based on your data structure
    return JSON.stringify(existingData) !== JSON.stringify(newData);
  }

  private async updateDatabase(taskName: string, newData: ScrapedData): Promise<void> {
    return new Promise((resolve) => {
      // Placeholder: Replace with actual SQLite update query
      this.db.run(`INSERT OR REPLACE INTO scraped_data (task_name, data) VALUES (?, ?)`, [taskName, JSON.stringify(newData)], () => resolve());
    });
  }

  private async performAdditionalActions(taskName: string, newData: ScrapedData): Promise<void> {
    // Placeholder for additional actions after data update
    console.log(`Performing additional actions for task ${taskName} with new data:`, newData);
    // Implement your specific actions here
  }

  async executeTaskImmediately(taskName: string): Promise<void> {
    await this.executeTask(taskName);
  }

  async executeNextTask(): Promise<void> {
    if (this.taskQueue.length > 0) {
      const taskName = this.taskQueue.shift();
      if (taskName) {
        await this.executeTask(taskName);
      }
    }
  }

  removeTask(taskName: string): boolean {
    const removed = this.tasks.delete(taskName);
    this.taskQueue = this.taskQueue.filter((name) => name !== taskName);
    return removed;
  }

  getTaskStatus(taskName: string): TaskInfo | undefined {
    return this.tasks.get(taskName)?.info;
  }

  getTaskData(taskName: string): ScrapedData | undefined {
    return this.tasks.get(taskName)?.data;
  }

  listAllTasks(): Array<{ name: string; info: TaskInfo; data?: ScrapedData }> {
    return Array.from(this.tasks.entries()).map(([name, task]) => ({
      name,
      info: task.info,
      data: task.data
    }));
  }

  getTaskQueue(): string[] {
    return [...this.taskQueue];
  }

  clearAllTasks(): void {
    this.tasks.clear();
    this.taskQueue = [];
  }
}

export const taskManager = new TaskManagerService();
