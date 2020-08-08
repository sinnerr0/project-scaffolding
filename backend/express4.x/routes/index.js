const indexRoute = require('express').Router()

indexRoute.use('/health', require('./health'))
indexRoute.use('/auth', require('./auth'))
indexRoute.use('/contact', require('./contact'))

module.exports = indexRoute
