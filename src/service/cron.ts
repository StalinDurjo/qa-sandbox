/*
import { scheduleJob, Job, RecurrenceRule, RecurrenceSpecDateRange } from 'node-schedule';
import axios from 'axios';

type TaskFunction = () => Promise<void>;

interface TaskConfig {
  name: string;
  type: 'module' | 'function' | 'api';
  schedule?: string | RecurrenceRule | RecurrenceSpecDateRange; // cron expression or node-schedule object
  module?: string;
  function?: TaskFunction;
  apiEndpoint?: string;
  apiMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  apiData?: any;
}

interface ScheduledTask extends TaskConfig {
  job?: Job;
  lastRun?: Date;
  nextRun?: Date;
  status: 'scheduled' | 'running' | 'completed' | 'failed';
}

export class TaskSchedulerService {
  private tasks: Map<string, ScheduledTask> = new Map();
  private taskQueue: string[] = [];

  constructor() {}

  scheduleTask(config: TaskConfig): void {
    if (this.tasks.has(config.name)) {
      throw new Error(`Task with name ${config.name} already exists`);
    }

    const task: ScheduledTask = { ...config, status: 'scheduled' };

    if (config.schedule) {
      task.job = scheduleJob(config.schedule, () => this.executeTask(config.name));
      task.nextRun = task.job.nextInvocation();
    }

    this.tasks.set(config.name, task);
    this.taskQueue.push(config.name);
  }

  async executeTask(taskName: string): Promise<void> {
    const task = this.tasks.get(taskName);
    if (!task) {
      throw new Error(`Task ${taskName} not found`);
    }

    task.status = 'running';
    task.lastRun = new Date();

    try {
      switch (task.type) {
        case 'module':
          if (task.module) {
            const moduleToRun = await import(task.module);
            await moduleToRun.default();
          }
          break;
        case 'function':
          if (task.function) {
            await task.function();
          }
          break;
        case 'api':
          if (task.apiEndpoint) {
            const method = task.apiMethod || 'GET';
            await axios({
              method,
              url: task.apiEndpoint,
              data: task.apiData,
            });
          }
          break;
      }
      task.status = 'completed';
    } catch (error) {
      console.error(`Error executing task ${taskName}:`, error);
      task.status = 'failed';
    }

    if (task.job) {
      task.nextRun = task.job.nextInvocation();
    }
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

  cancelTask(taskName: string): boolean {
    const task = this.tasks.get(taskName);
    if (task) {
      if (task.job) {
        task.job.cancel();
      }
      this.tasks.delete(taskName);
      this.taskQueue = this.taskQueue.filter(name => name !== taskName);
      return true;
    }
    return false;
  }

  getTaskStatus(taskName: string): ScheduledTask | undefined {
    return this.tasks.get(taskName);
  }

  listAllTasks(): ScheduledTask[] {
    return Array.from(this.tasks.values());
  }

  getTaskQueue(): string[] {
    return [...this.taskQueue];
  }

  clearAllTasks(): void {
    for (const task of this.tasks.values()) {
      if (task.job) {
        task.job.cancel();
      }
    }
    this.tasks.clear();
    this.taskQueue = [];
  }
}

*/

/*
create an instance of the TaskSchedulerService:
const taskScheduler = new TaskSchedulerService();

Schedule a task to run a module:
taskScheduler.scheduleTask({
  name: 'runDataAnalysis',
  type: 'module',
  module: './modules/dataAnalysis',
  schedule: '0 0 * * *' // Run every day at midnight
});

Schedule a task to run a custom function:
taskScheduler.scheduleTask({
  name: 'cleanupTempFiles',
  type: 'function',
  function: async () => {
    // Your cleanup logic here
    console.log('Cleaning up temp files...');
  },
  schedule: '0 1 * * *' // Run every day at 1 AM
});

Schedule a task to make an API request:
taskScheduler.scheduleTask({
  name: 'fetchDailyReport',
  type: 'api',
  apiEndpoint: 'https://api.example.com/daily-report',
  apiMethod: 'GET',
  schedule: '0 9 * * 1-5' // Run at 9 AM every weekday
});

Execute a task immediately:
await taskScheduler.executeTaskImmediately('runDataAnalysis');

Execute the next task in the queue:
await taskScheduler.executeNextTask();

Cancel a scheduled task:
const cancelled = taskScheduler.cancelTask('cleanupTempFiles');
console.log('Task cancelled:', cancelled);

Get the status of a specific task:
const status = taskScheduler.getTaskStatus('fetchDailyReport');
console.log('Task status:', status);

List all tasks:
const allTasks = taskScheduler.listAllTasks();
console.log('All tasks:', allTasks);

Get the current task queue:
const queue = taskScheduler.getTaskQueue();
console.log('Task queue:', queue);

Clear all tasks:
taskScheduler.clearAllTasks();

*/
