/*
import nodemailer from 'nodemailer';
import { scheduleJob } from 'node-schedule';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { promisify } from 'util';
import Imap from 'imap';
import simpleParser from 'mailparser';

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

interface ReceivedEmail {
  id: string;
  from: string;
  to: string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
  }>;
  date: Date;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private imap: Imap;
  private readonly maxRetries = 3;
  private readonly retryDelay = 5000; // 5 seconds
  private scheduledEmails: Map<string, ScheduledEmail> = new Map();

  constructor(
    private readonly smtpHost: string,
    private readonly smtpPort: number,
    private readonly imapHost: string,
    private readonly imapPort: number,
    private readonly user: string,
    private readonly pass: string,
    private readonly from: string
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.smtpHost,
      port: this.smtpPort,
      secure: this.smtpPort === 465,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });

    this.imap = new Imap({
      user: this.user,
      password: this.pass,
      host: this.imapHost,
      port: this.imapPort,
      tls: true,
    });
  }

  // ... (keep all the existing methods for sending emails)

  async receiveEmails(folder: string = 'INBOX', limit: number = 10): Promise<ReceivedEmail[]> {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => {
        this.imap.openBox(folder, false, (err, box) => {
          if (err) {
            reject(err);
            return;
          }

          const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false,
          };

          this.imap.search(['UNSEEN'], (err, results) => {
            if (err) {
              reject(err);
              return;
            }

            const fetchStream = this.imap.fetch(results.slice(-limit), fetchOptions);
            const emails: ReceivedEmail[] = [];

            fetchStream.on('message', (msg) => {
              msg.on('body', (stream, info) => {
                simpleParser(stream, (err, parsed) => {
                  if (err) {
                    console.error('Error parsing email:', err);
                    return;
                  }

                  emails.push({
                    id: parsed.messageId || '',
                    from: parsed.from?.text || '',
                    to: parsed.to?.text?.split(',') || [],
                    subject: parsed.subject || '',
                    text: parsed.text,
                    html: parsed.html,
                    attachments: parsed.attachments,
                    date: parsed.date || new Date(),
                  });
                });
              });
            });

            fetchStream.once('error', (err) => {
              reject(err);
            });

            fetchStream.once('end', () => {
              this.imap.end();
              resolve(emails);
            });
          });
        });
      });

      this.imap.once('error', (err) => {
        reject(err);
      });

      this.imap.connect();
    });
  }

  async markEmailAsRead(emailId: string, folder: string = 'INBOX'): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => {
        this.imap.openBox(folder, false, (err) => {
          if (err) {
            reject(err);
            return;
          }

          this.imap.addFlags(emailId, ['\\Seen'], (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
            this.imap.end();
          });
        });
      });

      this.imap.once('error', (err) => {
        reject(err);
      });

      this.imap.connect();
    });
  }

  async deleteEmail(emailId: string, folder: string = 'INBOX'): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => {
        this.imap.openBox(folder, false, (err) => {
          if (err) {
            reject(err);
            return;
          }

          this.imap.addFlags(emailId, ['\\Deleted'], (err) => {
            if (err) {
              reject(err);
            } else {
              this.imap.expunge((err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
                this.imap.end();
              });
            }
          });
        });
      });

      this.imap.once('error', (err) => {
        reject(err);
      });

      this.imap.connect();
    });
  }

  async watchInbox(callback: (email: ReceivedEmail) => void): Promise<void> {
    this.imap.once('ready', () => {
      this.imap.openBox('INBOX', false, (err) => {
        if (err) {
          console.error('Error opening inbox:', err);
          return;
        }

        this.imap.on('mail', () => {
          this.receiveEmails('INBOX', 1).then((emails) => {
            if (emails.length > 0) {
              callback(emails[0]);
            }
          }).catch((err) => {
            console.error('Error receiving new email:', err);
          });
        });
      });
    });

    this.imap.once('error', (err) => {
      console.error('IMAP connection error:', err);
    });

    this.imap.connect();
  }
}
  */

/*

update the constructor call with IMAP details:
const emailService = new EmailService(
  'smtp.example.com',
  587,
  'imap.example.com',
  993,
  'your-username',
  'your-password',
  'sender@example.com'
);

To receive the latest 10 unread emails:
const emails = await emailService.receiveEmails();
emails.forEach(email => {
  console.log(`From: ${email.from}`);
  console.log(`Subject: ${email.subject}`);
  console.log(`Body: ${email.text}`);
});

To mark an email as read:
await emailService.markEmailAsRead(emailId);

To delete an email:
await emailService.deleteEmail(emailId);

To watch for new emails in real-time:
emailService.watchInbox((email) => {
  console.log('New email received:', email.subject);
});

To use these new features, you'll need to install additional npm packages:
npm install imap mailparser

If you're using Mailtrap, your configuration might look like this:
const emailService = new EmailService(
  'smtp.mailtrap.io',
  2525,
  'imap.mailtrap.io',
  993,
  'your-mailtrap-username',
  'your-mailtrap-password',
  'sender@example.com'
);

*/
