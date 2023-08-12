enum LogLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  DEBUG = 'debug',
}

let logLevel: LogLevel = LogLevel.INFO

export const setLogLevel = (level: LogLevel) => {
  logLevel = level
}

const shouldLog = (level: LogLevel): boolean => {
  return logLevel <= level
}

const log = (level: LogLevel, message: string, data?: any): void => {
  if (shouldLog(level)) {
    const logMessage = `[${level.toUpperCase()}]: ${message}`
    if (data) {
      console.log(logMessage, data)
    } else {
      console.log(logMessage)
    }
  }
}

export const logger = {
  info(message: string, data?: any): void {
    log(LogLevel.INFO, message, data)
  },

  warn(message: string, data?: any): void {
    log(LogLevel.WARNING, message, data)
  },

  error(message: string, data?: any): void {
    log(LogLevel.ERROR, message, data)
  },

  debug(message: string, data?: any): void {
    log(LogLevel.DEBUG, message, data)
  },
}
