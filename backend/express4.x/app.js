const express = require('express')
const app = express()
const http = require('http')

// set middleware
app.use(
  require('express-slow-down')({
    windowMs: 1 * 60 * 1000, // 1 minute
    delayAfter: 100, // allow 500 requests per 1 minute, then...
    delayMs: 100, // begin adding 100ms of delay per request above 500:
  })
)
app.use(require('helmet')())
app.use(require('compression')())
app.use(require('cookie-parser')())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// logger(default, express) middleware
require('./middleware/logger')(app)
// jwt middleware
require('./middleware/jwt')(app)
// db midddleware
require('./middleware/db')(app)

// register routes
app.use('/api', require('./routes'))

// server start
const logger = require('winston').loggers.get('default')
const server = http
  .createServer(app)
  .listen(process.env.PORT || 3000)
  .on('listening', function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    logger.info('Listening on ' + bind)
  })

module.exports = app
