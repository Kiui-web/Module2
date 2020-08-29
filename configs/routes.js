const express = require('express')
const router = express.Router()
const userController = require ('../controllers/users.controller')
const eventController = require('../controllers/event.controller')
const sessionMiddleware = require('../middlewares/session.middleware')
const uploads = require('../configs/cloudinary.config')


router.get('/login', sessionMiddleware.isNotAuthenticated, userController.login)
router.post('/login', sessionMiddleware.isNotAuthenticated, userController.doLogin)
router.get('/signup', sessionMiddleware.isNotAuthenticated, userController.signup)
router.post('/users',  userController.createUser)

router.get('/activate/:token', sessionMiddleware.isNotAuthenticated, userController.activateUser);
router.get('/event/:access', eventController.go)


router.get('/createEvent', eventController.createEvent)
router.post('/event', eventController.saveEvent)

router.get('/', userController.index)


module.exports = router;

