const express = require('express')
const app = express()
const http = require('http')
const slowDown = require('express-slow-down')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const compression = require('compression')

// set middleware
app.use(
  slowDown({
    windowMs: 1 * 60 * 1000, // 1 minute
    delayAfter: 100, // allow 100 requests per 1 minute, then...
    delayMs: 100, // begin adding 100ms of delay per request above 100:
  })
)
app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// register logger(default, express) middleware
require('./middleware/logger')(app)

// register routes
app.use('/api', require('./routes'))

// server start
const winston = require('winston')
const logger = winston.loggers.get('default')
const server = http
  .createServer(app)
  .listen(process.env.PORT || 3000)
  .on('listening', function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    logger.info('Listening on ' + bind)
  })

module.exports = app
