const logger = require('winston').loggers.get('default')
const router = require('express').Router()
const code = require('../code')

router
  /* user login. */
  .post('/login', function (req, res, next) {
    res.json({ code: code.OK })
  })
  /* user login. */
  .post('/logout', function (req, res, next) {
    res.json({ code: code.OK })
  })
  /* user token refresh. */
  .post('/refresh', function (req, res, next) {
    res.json({ code: code.OK })
  })

module.exports = router
