const jwt = require('jsonwebtoken')
const code = require('../code')
const logger = require('winston').loggers.get('default')
const JWT_SCRET_KEY = process.env.JWT_SCRET_KEY
const ONE_HOUR = 60 * 60 * 1000
const ROLE = {
  ADMIN: 'ADMIN',
}
const ROLES = ['ADMIN']

function checkJwt(req, res, next) {
  let token = ''
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  let jwtPayload
  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, JWT_SCRET_KEY)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send(error.message)
    return
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { id } = jwtPayload
  const isoDate = new Date(Date.now() + ONE_HOUR).toISOString()
  const newToken = jwt.sign({ id, exp_iso: isoDate }, JWT_SCRET_KEY, {
    expiresIn: '1h',
    noTimestamp: true,
  })
  res.setHeader('token', newToken)
  next()
}

function checkRole(roles) {
  return function checkRoleHandler(req, res, next) {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.id

    //Get user role from the database
    let user
    try {
      user = {}
    } catch (err) {
      res
        .status(401)
        .json({ code: code.ERROR.JWT_001, message: code.MESSAGE.JWT_001 })
    }

    //Check if array of authorized roles includes the user's role
    if (ROLES.includes(user.role)) {
      next()
    } else {
      res.status(401).send()
    }
  }
}

module.exports = {
  checkJwt,
  checkRole,
  ROLE,
}
