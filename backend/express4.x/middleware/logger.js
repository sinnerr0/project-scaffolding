const winston = require('winston')
require('winston-daily-rotate-file')
const expressWinston = require('express-winston')
const packageJson = require('../package.json')

// A function to determine if logging is skipped
function ignoreRoute(req, res) {
  if (req.url.includes('/api/auth')) {
    return true
  }
  return false
}

module.exports = (app) => {
  const transports =
    process.env.NODE_ENV !== 'production'
      ? [new winston.transports.Console()]
      : [
          new winston.transports.DailyRotateFile({
            dirname: 'logs',
            filename: 'combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD_hh-mm',
            zippedArchive: true,
            frequency: '1m',
            maxFiles: '3m',
            maxsize: 1000,
            handleExceptions: true,
            handleRejections: true,
          }),
        ]
  const exceptionTransports =
    process.env.NODE_ENV !== 'production'
      ? [new winston.transports.Console()]
      : [
          new winston.transports.DailyRotateFile({
            dirname: 'logs',
            filename: 'exceptions-%DATE%.log',
            datePattern: 'YYYY-MM-DD_hh-mm',
            zippedArchive: true,
            frequency: '1m',
            maxFiles: '3m',
            maxsize: 1000,
            handleExceptions: true,
            handleRejections: true,
          }),
        ]

  winston.loggers.add('default', {
    transports,
    exceptionHandlers: exceptionTransports,
    exitOnError: false,
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    defaultMeta: { version: packageJson.version },
    format: winston.format.combine(
      winston.format.json(),
      winston.format.timestamp(),
      process.env.NODE_ENV !== 'production'
        ? winston.format.prettyPrint()
        : winston.format.json()
    ),
  })

  app.use(
    expressWinston.logger({
      transports,
      exceptionHandlers: exceptionTransports,
      exitOnError: false,
      format:
        process.env.NODE_ENV !== 'production'
          ? winston.format.combine(
              winston.format.timestamp(),
              winston.format.prettyPrint()
            )
          : winston.format.timestamp(),
      ignoreRoute,
      dynamicMeta: (req, res) => {
        const meta = {}
        if (req) {
          const httpRequest = {}
          httpRequest.method = `${req.method} HTTP/${req.httpVersion}`
          httpRequest.url = `${req.protocol}://${req.get('host')}${req.url}`
          httpRequest.ip = req.ip
          httpRequest.requestSize = req.socket.bytesRead
          httpRequest.contentType = req.headers['content-type']
            ? req.headers['content-type']
            : ''
          httpRequest.query = req.query
          httpRequest.body = req.body
          meta.req = httpRequest
        }

        if (res) {
          const httpResponse = {}
          httpResponse.status = res.statusCode
          if (res.body) {
            if (typeof res.body === 'object') {
              const body = JSON.stringify(res.body)
              httpResponse.body = body
              httpResponse.responseSize = body.length
            } else if (typeof res.body === 'string') {
              httpResponse.body = res.body
              httpResponse.responseSize = res.body.length
            }
          }
          meta.res = httpResponse
        }
        meta.version = packageJson.version
        return meta
      },
    })
  )
}
