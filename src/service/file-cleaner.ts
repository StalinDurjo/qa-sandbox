/*
import fs from 'fs';
import path from 'path';
import { scheduleJob, Job } from 'node-schedule';

interface CleanupTask {
  name: string;
  directory: string;
  pattern: RegExp;
  age: number; // in days
  schedule: string; // cron expression
}

export class FileCleanerService {
  private tasks: Map<string, CleanupTask> = new Map();
  private scheduledJobs: Map<string, Job> = new Map();

  constructor() {}

  addTask(task: CleanupTask): void {
    this.tasks.set(task.name, task);
    this.scheduleTask(task);
  }

  removeTask(taskName: string): boolean {
    const task = this.tasks.get(taskName);
    if (task) {
      this.tasks.delete(taskName);
      const job = this.scheduledJobs.get(taskName);
      if (job) {
        job.cancel();
        this.scheduledJobs.delete(taskName);
      }
      return true;
    }
    return false;
  }

  private scheduleTask(task: CleanupTask): void {
    const job = scheduleJob(task.schedule, () => {
      this.cleanFiles(task);
    });
    this.scheduledJobs.set(task.name, job);
  }

  async cleanFiles(task: CleanupTask): Promise<string[]> {
    const deletedFiles: string[] = [];
    const now = new Date();

    try {
      const files = await fs.promises.readdir(task.directory);
      for (const file of files) {
        if (task.pattern.test(file)) {
          const filePath = path.join(task.directory, file);
          const stats = await fs.promises.stat(filePath);
          const fileAge = (now.getTime() - stats.mtime.getTime()) / (1000 * 3600 * 24);

          if (fileAge > task.age) {
            await fs.promises.unlink(filePath);
            deletedFiles.push(filePath);
          }
        }
      }
    } catch (error) {
      console.error(`Error cleaning files for task ${task.name}:`, error);
    }

    return deletedFiles;
  }

  async cleanAllTasks(): Promise<Map<string, string[]>> {
    const results = new Map<string, string[]>();
    for (const [taskName, task] of this.tasks) {
      const deletedFiles = await this.cleanFiles(task);
      results.set(taskName, deletedFiles);
    }
    return results;
  }

  async cleanTask(taskName: string): Promise<string[]> {
    const task = this.tasks.get(taskName);
    if (task) {
      return await this.cleanFiles(task);
    }
    throw new Error(`Task ${taskName} not found`);
  }

  listTasks(): CleanupTask[] {
    return Array.from(this.tasks.values());
  }

  getTaskStatus(taskName: string): { nextRun: Date | null; lastRun: Date | null } | null {
    const job = this.scheduledJobs.get(taskName);
    if (job) {
      return {
        nextRun: job.nextInvocation(),
        lastRun: job.lastDate(),
      };
    }
    return null;
  }

  async cleanFilesNow(directory: string, pattern: RegExp, age: number): Promise<string[]> {
    const tempTask: CleanupTask = {
      name: 'temp',
      directory,
      pattern,
      age,
      schedule: '* * * * *', // Dummy schedule, not used
    };
    return await this.cleanFiles(tempTask);
  }
}
  */

/*
create an instance of the FileCleanerService:
const fileCleanerService = new FileCleanerService();

Add a cleanup task for Playwright report files:
fileCleanerService.addTask({
  name: 'playwrightReports',
  directory: './test-results',
  pattern: /^playwright-report.*\.html$/,
  age: 3, // Delete files older than 3 days
  schedule: '0 0 * * *' // Run every day at midnight
});

Add another task for cleaning up log files:
fileCleanerService.addTask({
  name: 'logFiles',
  directory: './logs',
  pattern: /\.log$/,
  age: 7, // Delete files older than 7 days
  schedule: '0 1 * * 0' // Run every Sunday at 1 AM
});

To clean files for a specific task immediately:
const deletedFiles = await fileCleanerService.cleanTask('playwrightReports');
console.log('Deleted files:', deletedFiles);

To clean files for all tasks immediately:
const allDeletedFiles = await fileCleanerService.cleanAllTasks();
console.log('All deleted files:', allDeletedFiles);

To clean files in a specific directory without creating a persistent task:
const deletedTempFiles = await fileCleanerService.cleanFilesNow(
  './temp',
  /\.tmp$/,
  1 // Delete files older than 1 day
);
console.log('Deleted temp files:', deletedTempFiles);

To list all tasks:
const tasks = fileCleanerService.listTasks();
console.log('All tasks:', tasks);

To get the status of a specific task:
const status = fileCleanerService.getTaskStatus('playwrightReports');
console.log('Playwright reports task status:', status);

To remove a task:
const removed = fileCleanerService.removeTask('logFiles');
console.log('Log files task removed:', removed);


*/
