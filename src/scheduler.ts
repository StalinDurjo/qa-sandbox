import { scheduleJob, Job, RecurrenceRule, RecurrenceSpecDateRange } from 'node-schedule';

interface TaskConfig {
  name: string;
  schedule?: string | RecurrenceRule | RecurrenceSpecDateRange; // cron expression or node-schedule object
  module?: string;
  function?: () => Promise<void>;
}

interface ScheduledTask extends TaskConfig {
  job?: Job;
  lastRun?: Date;
  nextRun?: Date;
  status: 'scheduled' | 'running' | 'completed' | 'failed';
}

export class TaskSchedulerService {
  tasks: Map<string, ScheduledTask> = new Map();
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
      if (task.function) {
        await task.function();
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
      this.taskQueue = this.taskQueue.filter((name) => name !== taskName);
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

export const scheduler = new TaskSchedulerService();
