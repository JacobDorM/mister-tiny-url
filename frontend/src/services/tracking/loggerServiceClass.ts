// Define the LogLevel enum separately
import { config } from '../../config/config'
import { HttpService } from '../httpService'
// import axios from 'axios'
export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export type LogHandler = (logLevel: LogLevel, logMessage: string, data?: any) => void

export class LoggerService {
  // What is private static
  private static instance: LoggerService
  private logLevel: LogLevel
  private logHandler: LogHandler | null = null
  private logstashUrl: string = config.logstash.baseUrl
  private httpService = new HttpService(config.logstash.baseUrl)

  private constructor(logLevel: LogLevel) {
    this.logLevel = logLevel
  }

  static getInstance(logLevel: LogLevel = LogLevel.INFO): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService(logLevel)
    }
    return LoggerService.instance
  }

  private shouldLog(logLevel: LogLevel): boolean {
    return this.logLevel <= logLevel
  }

  private async sendToLogstash(logLevel: LogLevel, logMessage: string, data?: any): Promise<void> {
    if (this.logstashUrl) {
      try {
        const log = {
          level: logLevel,
          message: logMessage,
          data: data || {},
        }
        await this.httpService.post(this.logstashUrl, log)
      } catch (error) {
        console.error('Failed to send log to Logstash:', error)
      }
    }
  }

  private log(logLevel: LogLevel, message: string, data?: any): void {
    if (this.shouldLog(logLevel)) {
      const logMessage = this.formatLogMessage(logLevel, message, data)
      if (this.logHandler) {
        this.logHandler(logLevel, logMessage, data)
      } else {
        console.log(logMessage)
      }
      this.sendToLogstash(logLevel, logMessage, data)
    }
  }

  private getTimestamp(): string {
    return new Date().toISOString()
  }

  private formatLogMessage(logLevel: LogLevel, message: string, data?: any): string {
    const timestamp = this.getTimestamp()
    const logMessage = `[${timestamp}][${logLevel.toUpperCase()}]: ${message}`
    return data ? `${logMessage} ${JSON.stringify(data)}` : logMessage
  }

  setLogLevel(logLevel: LogLevel): void {
    this.logLevel = logLevel
  }

  getLogLevel(): LogLevel {
    return this.logLevel
  }

  setLogHandler(logHandler: LogHandler): void {
    this.logHandler = logHandler
  }

  setLogstashUrl(url: string): void {
    this.logstashUrl = url
  }

  trace(message: string, data?: any): void {
    this.log(LogLevel.TRACE, message, data)
  }

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data)
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data)
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARNING, message, data)
  }

  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data)
  }
}
