const indexRoute = require('express').Router()
const usersRoute = require('./users')
const authRoute = require('./auth')

indexRoute.use('/users', usersRoute)
indexRoute.use('/auth', authRoute)

module.exports = indexRoute
