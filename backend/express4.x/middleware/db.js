const logger = require('winston').loggers.get('default')
const mongoose = require('mongoose')

module.exports = (app) => {
  mongoose
    .connect('mongodb://admin:pass@192.168.99.100:27017/admin')
    .then(() => {
      logger.info('mongo db connected')
    })
    .catch((err) => {
      logger.error('mongo db connection error', [err])
    })
}
