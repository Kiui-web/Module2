const express = require('express')
const router = express.Router()
const userController = require ('../controllers/users.controller')
const eventController = require('../controllers/event.controller')
const sessionMiddleware = require('../middlewares/session.middleware')
const uploads = require('../configs/cloudinary.config')


router.get('/login', userController.login)
router.get('/users',  userController.createUser)
router.get('/profile', userController.profile);
router.post('/logout', userController.logout);
router.post('/user/addName', userController.addName)
router.post('/update/:id', userController.upDateProfile)

router.get('/event/:id', eventController.detailEvent)
router.get('/events', eventController.eventsAll)
router.get('/createEvent', eventController.createEvent)
router.post('/event', eventController.saveEvent)
router.get('/joinevent', eventController.joinEvent)
router.get('/share/:id', eventController.share)
router.get('/delete/:id', eventController.deleteEvent)
router.get('/edit/:id', eventController.editEvent)
router.post('/edit/:id', eventController.modifyEvent)

router.post('/assistant/add', eventController.add)
router.post('/assistant/delete', eventController.delete)











router.get('/', userController.index)



module.exports = router;

