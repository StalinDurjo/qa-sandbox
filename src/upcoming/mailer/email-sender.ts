/*
import nodemailer from 'nodemailer';
import { scheduleJob } from 'node-schedule';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { promisify } from 'util';

interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
  }>;
}

interface ScheduledEmail extends EmailOptions {
  scheduledTime: Date;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly maxRetries = 3;
  private readonly retryDelay = 5000; // 5 seconds
  private scheduledEmails: Map<string, ScheduledEmail> = new Map();

  constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly user: string,
    private readonly pass: string,
    private readonly from: string
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: this.port === 465,
      auth: {
        user: this.user,
        pass: this.pass
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    const mailOptions = {
      from: this.from,
      ...options
    };

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        await this.transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${options.to}`);
        return;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        if (attempt === this.maxRetries) {
          throw new Error(`Failed to send email after ${this.maxRetries} attempts`);
        }
        await promisify(setTimeout)(this.retryDelay);
      }
    }
  }

  scheduleEmail(options: EmailOptions, scheduledTime: Date): string {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.scheduledEmails.set(id, { ...options, scheduledTime });

    scheduleJob(scheduledTime, async () => {
      try {
        await this.sendEmail(options);
        this.scheduledEmails.delete(id);
      } catch (error) {
        console.error(`Failed to send scheduled email ${id}:`, error);
      }
    });

    return id;
  }

  cancelScheduledEmail(id: string): boolean {
    const scheduledEmail = this.scheduledEmails.get(id);
    if (scheduledEmail) {
      const job = scheduleJob(scheduledEmail.scheduledTime, () => {});
      if (job) {
        job.cancel();
        this.scheduledEmails.delete(id);
        return true;
      }
    }
    return false;
  }

  async sendEmailWithTemplate(templateName: string, data: any, options: EmailOptions): Promise<void> {
    const templateContent = readFileSync(`./templates/${templateName}.hbs`, 'utf-8');
    const template = compile(templateContent);
    const html = template(data);

    await this.sendEmail({ ...options, html });
  }

  getScheduledEmails(): ScheduledEmail[] {
    return Array.from(this.scheduledEmails.values());
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Failed to verify email connection:', error);
      return false;
    }
  }
}

*/

/*
USECASE
create an instance of the EmailService:
const emailService = new EmailService(
  'smtp.example.com',
  587,
  'your-username',
  'your-password',
  'sender@example.com'
);

To send an email instantly:
await emailService.sendEmail({
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'This is a test email',
});

To schedule an email:
const scheduledTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
const id = emailService.scheduleEmail(
  {
    to: 'recipient@example.com',
    subject: 'Scheduled Email',
    text: 'This is a scheduled email',
  },
  scheduledTime
);

To cancel a scheduled email:
const cancelled = emailService.cancelScheduledEmail(id);

To send an email using a template:
await emailService.sendEmailWithTemplate(
  'welcome',
  { name: 'John Doe' },
  {
    to: 'recipient@example.com',
    subject: 'Welcome Email',
  }
);

To get all scheduled emails:
const scheduledEmails = emailService.getScheduledEmails();

To verify the email connection:
const isConnected = await emailService.verifyConnection();

To use this service, you'll need to install the following npm packages:
npm install nodemailer node-schedule handlebars
*/
