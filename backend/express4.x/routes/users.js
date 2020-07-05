const logger = require('winston').loggers.get('default')
const router = require('express').Router()
const code = require('../code')
const jwt = require('../middleware/jwt')

const users = []

router
  /* users listing. */
  .get('/', function (req, res, next) {
    res.json({ code: code.OK, users })
  })
  /* user detail. */
  .get('/:id', function (req, res, next) {
    if (!users[req.params.id]) {
      res
        .status(400)
        .json({ code: code.ERROR.USERS_001, message: code.MESSAGE.USERS_001 })
      return
    }
    res.json({ code: code.OK, user: users[req.params.id] })
  })
  /* users creating. */
  .post('/', function (req, res, next) {
    res.status(201).json({ code: code.OK })
  })
  /* users updating. */
  .put('/', function (req, res, next) {
    res.status(201).json({ code: code.OK })
  })
  /* users deleting. */
  .delete('/', function (req, res, next) {
    res.json({ code: code.OK })
  })

module.exports = router
