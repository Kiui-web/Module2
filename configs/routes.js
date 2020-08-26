const express = require('express')
const router = express.Router()
const userController = require ('../controllers/users.controller')
const eventController = require('../controllers/event.controller')
const sessionController = require('../middlewares/session.middleware')
const uploads = require('../configs/cloudinary.config')

router.get('/', userController.index)


module.exports = router;

