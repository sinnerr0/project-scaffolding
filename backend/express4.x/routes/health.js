// const logger = require('winston').loggers.get('default')
const router = require('express').Router()

router.get('/', function (req, res, next) {
  res.sendStatus(200)
})

module.exports = router
