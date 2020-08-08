const { loginRequired } = require('../controller/user')
const {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} = require('../controller/contact')

const router = require('express').Router()

router
  .get('/', loginRequired, getContacts)
  .post('/', loginRequired, addNewContact)
  .get('/:contactId', loginRequired, getContactWithID)
  .put('/:contactId', loginRequired, updateContact)
  .delete('/:contactId', loginRequired, deleteContact)

module.exports = router
