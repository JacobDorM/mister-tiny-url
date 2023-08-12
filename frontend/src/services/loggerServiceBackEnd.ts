// import winston, { LogEntry, format, transports } from 'winston'
// // import { LogstashTransport } from 'winston-logstash-transport' // Install "winston-logstash-transport" package
export {}
// export enum LogLevel {
//   INFO = 'info',
//   WARNING = 'warning',
//   ERROR = 'error',
//   DEBUG = 'debug',
// }

// // Create a log format that includes a timestamp, log level, and message
// const logFormat = format.combine(
//   format.timestamp(),
//   format.printf(({ timestamp, level, message }) => {
//     return `${timestamp} [${level.toUpperCase()}]: ${message}`
//   })
// )

// // Create the logger instance
// export const logger = winston.createLogger({
//   level: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG, // Adjust the log level based on the environment, // Minimum log level to display: ;
//   format: logFormat,
//   transports: [
//     new transports.Console(), // Log to the console
//     new transports.File({ filename: 'combined.log' }), // Log to a file
//     new LogstashTransport({
//       host: 'localhost', // Replace with your Logstash server address
//       port: 5044, // Replace with the Logstash port
//       mode: 'beats',
//       transform: (info: LogEntry) => {
//         if (process.env.NODE_ENV !== 'production') {
//           info.message = filterSensitiveData(info.message)
//         }
//         return info
//       },
//     }), // Log to Logstash using TCP
//   ],
// })

// const sensitiveFields = ['password', 'creditCardNumber']

// const filterSensitiveData = (data?: any) => {
//   if (!data || typeof data !== 'object') {
//     return data
//   }

//   const filteredData: any = {}
//   for (const key in data) {
//     filteredData[key] = sensitiveFields.includes(key) ? '***SENSITIVE***' : data[key]
//   }

//   return filteredData
// }

// export const log = (level: LogLevel, message: string, data?: any) => {
//   logger.log(level, message, data)
// }
