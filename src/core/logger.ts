import winston, { format, transports } from 'winston';
import path from 'path';

// Define custom log levels with corresponding priorities
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Define colors for each log level
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

// Custom format for development logging
const developmentFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize({ colors: logColors }),
  format.printf(({ timestamp, level, message, service, ...metadata }) => {
    let msg = `${timestamp} [${service || 'QA Sandbox'}] ${level}: ${message}`;
    if (Object.keys(metadata).length > 0) {
      msg += `\n${JSON.stringify(metadata, null, 2)}`;
    }
    return msg;
  })
);

// Custom format for production logging (without colors, with JSON structure)
const productionFormat = format.combine(format.timestamp(), format.json());

class Logger {
  private logger: winston.Logger;
  private static instance: Logger;

  private constructor() {
    const isProduction = process.env.NODE_ENV === 'production';
    const logsDir = path.join(process.cwd(), 'out/logs');

    // Create transports
    const consoleTransport = new transports.Console({
      level: isProduction ? 'info' : 'debug'
    });

    const fileTransport = new transports.File({
      filename: path.join(logsDir, 'logger.log'),
      level: isProduction ? 'info' : 'debug',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    });

    const errorFileTransport = new transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    });

    this.logger = winston.createLogger({
      levels: logLevels,
      format: isProduction ? productionFormat : developmentFormat,
      transports: [consoleTransport, fileTransport, errorFileTransport],
      // Handle exceptions and rejections
      exceptionHandlers: [
        new transports.File({
          filename: path.join(logsDir, 'exceptions.log'),
          maxsize: 5242880, // 5MB
          maxFiles: 5
        })
      ],
      rejectionHandlers: [
        new transports.File({
          filename: path.join(logsDir, 'rejections.log'),
          maxsize: 5242880, // 5MB
          maxFiles: 5
        })
      ]
    });

    // Add error event handlers for transports
    [fileTransport, errorFileTransport].forEach((transport) => {
      transport.on('error', this.handleTransportError);
    });
  }

  private handleTransportError(error: Error): void {
    console.error('Logger transport error:', error);
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Create a child logger with a service name
  public child(service: string): winston.Logger {
    return this.logger.child({ service });
  }

  // Helper methods for different log levels
  public error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }

  public warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  public info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  public http(message: string, meta?: any): void {
    this.logger.http(message, meta);
  }

  public debug(message: string, meta?: any): void {
    this.logger.debug(message, meta);
  }

  // Helper method to log errors with stack traces
  public logError(error: Error, context?: string): void {
    this.error(error.message, {
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
  }

  // Method to create an Express middleware for HTTP logging
  public httpLogger(): any {
    return (req: any, res: any, next: any) => {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        this.http('HTTP Request', {
          method: req.method,
          url: req.url,
          status: res.statusCode,
          duration: `${duration}ms`,
          userAgent: req.get('user-agent'),
          ip: req.ip
        });
      });
      next();
    };
  }
}

export default Logger.getInstance();
