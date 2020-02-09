const express = require('express')

const router = express.Router();

const UserController = require('./controllers/users');

const _userController = new UserController();

router.get('/add', _userController.add),
router.get('/', _userController.get),
router.post('/', _userController.post),
router.delete('/', _userController.delete)

module.exports = router;