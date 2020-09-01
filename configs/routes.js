const express = require('express')
const router = express.Router()
const userController = require ('../controllers/users.controller')
const eventController = require('../controllers/event.controller')
const sessionMiddleware = require('../middlewares/session.middleware')
const uploads = require('../configs/cloudinary.config')

router.get('/auth/google/callback', sessionMiddleware.isNotAuthenticated, userController.doSocialLoginGoogle);
router.get('/login', userController.login)
router.post('/login', userController.doLogin)
router.get('/signup', sessionMiddleware.isNotAuthenticated, userController.signup)
router.post('/users',  userController.createUser)
router.get('/activate/:token', sessionMiddleware.isNotAuthenticated, userController.activateUser);



router.get('/event/:id', eventController.detailEvent)
router.get('/events', eventController.eventsAll)


router.get('/createEvent', eventController.createEvent)
router.post('/event', eventController.saveEvent)

router.get('/joinevent', eventController.joinEvent)

router.get('/', userController.index)


module.exports = router;

