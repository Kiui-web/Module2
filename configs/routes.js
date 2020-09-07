const express = require('express')
const router = express.Router()
const userController = require ('../controllers/users.controller')
const eventController = require('../controllers/event.controller')
const sessionMiddleware = require('../middlewares/session.middleware')
const uploads = require('../configs/cloudinary.config')


router.get('/login', userController.login)
router.get('/signup', userController.signup)
router.get('/users',  userController.createUser)
router.get('/profile', userController.profile);
router.post('/logout', userController.logout);


router.get('/eventes', eventController.detailEvent)

router.get('/event/:id', eventController.detailEvent)
router.get('/events', eventController.eventsAll)
router.get('/createEvent', eventController.createEvent)
router.post('/event', eventController.saveEvent)
router.get('/joinevent', eventController.joinEvent)
router.get('/share/:id', eventController.share)








router.get('/', userController.index)



module.exports = router;

