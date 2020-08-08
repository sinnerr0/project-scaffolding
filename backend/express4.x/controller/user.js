const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserSchema } = require('../model/user')

const User = mongoose.model('User', UserSchema)

const register = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err
      if (!user) {
        const newUser = new User(req.body)
        newUser.hashPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.save((err, user) => {
          if (err) {
            return res.status(400).send({ message: err.message })
          } else {
            user.hashPassword = undefined
            return res.json(user)
          }
        })
      } else if (user) {
        res.status(400).json({ message: 'User aleady exist.' })
      }
    }
  )
}

const login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err
      if (!user) {
        res
          .status(401)
          .json({ message: 'Authentication failed. No user found!' })
      } else if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          res
            .status(401)
            .json({ message: 'Authentication failed. Wrong password!' })
        } else {
          return res.json({
            token: jwt.sign(
              { email: user.email, username: user.username, _id: user.id },
              'RESTFULAPIs'
            ),
          })
        }
      }
    }
  )
}

const loginRequired = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' })
  }
}

module.exports = {
  register,
  login,
  loginRequired,
}
