// const logger = require('winston').loggers.get('default')
const { login, register } = require('../controller/user')

const router = require('express').Router()

// registration route
router.post('/register', register)

// login route
router.post('/login', login)

module.exports = router
