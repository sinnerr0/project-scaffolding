const mongoose = require('mongoose')
const { ContactSchema } = require('../model/contact')

const Contact = mongoose.model('Contact', ContactSchema)

const addNewContact = (req, res) => {
  let newContact = new Contact(req.body)

  newContact.save((err, contact) => {
    if (err) {
      res.status(400).send(err.message)
      return
    }
    res.json(contact)
  })
}

const getContacts = (req, res) => {
  Contact.find({}, (err, contact) => {
    if (err) {
      res.status(400).send(err.message)
      return
    }
    res.json(contact)
  })
}

const getContactWithID = (req, res) => {
  Contact.findById(req.params.contactId, (err, contact) => {
    if (err) {
      res.send(err)
      return
    }
    res.json(contact)
  })
}

const updateContact = (req, res) => {
  Contact.findOneAndUpdate(
    { _id: req.params.contactId },
    req.body,
    { new: true },
    (err, contact) => {
      if (err) {
        res.status(400).send(err.message)
        return
      }
      res.json(contact)
    }
  )
}

const deleteContact = (req, res) => {
  Contact.findById(req.params.contactId, (err, contact) => {
    if (err) {
      res.status(400).send({ message: 'User not found.' })
      return
    }
    contact
      .remove()
      .then(() => {
        res.json({ message: 'Successfully deleted contact' })
      })
      .catch((err) => {
        res.sendStatus(500)
      })
  })
}

module.exports = {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
}
