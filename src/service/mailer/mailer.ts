import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { promisify } from 'util';
import env from 'dotenv';

env.config();

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

export class Mailer {
  private transporter: nodemailer.Transporter;
  private readonly maxRetries = 3;
  private readonly retryDelay = 5 * 1000; // 5 seconds

  private readonly host: string;
  private readonly port: number;
  private readonly user: string;
  private readonly pass: string;
  private readonly from: string;

  constructor({ host, port, user, pass, from }) {
    this.host = host;
    this.port = port;
    this.user = user;
    this.pass = pass;
    this.from = from;

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

  async sendEmailWithTemplate({ templateName = 'default', content, options }: { templateName?: string; content: { message: unknown }; options: EmailOptions }): Promise<void> {
    const templateContent = readFileSync(process.cwd() + `/src/service/mailer/templates/${templateName}.hbs`, 'utf-8');
    const template = compile(templateContent);
    const html = template(content);

    await this.sendEmail({ ...options, html });
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

export const mailer = new Mailer({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  user: process.env.MAILER_USER,
  pass: process.env.MAILER_PASSWORD,
  from: process.env.MAILER_FROM
});
