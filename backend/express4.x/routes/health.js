const router = require('express').Router()

router.get('/', function (req, res, next) {
  res.sendStatus(200)
})

module.exports = router
