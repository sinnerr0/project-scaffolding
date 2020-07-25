const indexRoute = require('express').Router()

indexRoute.use('/health', require('./health'))

module.exports = indexRoute
