const express = require ('express')
const UserRouter = express.Router()
const UsersController = require('../controllers/user/index.js')
const authenticate = require('../helpers/functions/auth.js')
const checkRoles = require('../helpers/functions/checkRoles.js')

// UserRouter.post('/', UsersController.addUser)
UserRouter.get('/:id', authenticate , UsersController.getUserById)
UserRouter.get('/', authenticate , UsersController.getAllUser)
UserRouter.patch('/:id', authenticate, checkRoles(['Manager', 'Admin']), UsersController.updateUser)
UserRouter.delete('/:id', authenticate, checkRoles(['Manager', 'Admin']), UsersController.deleteUser)

module.exports = UserRouter