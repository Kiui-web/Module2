const express = require('express')
const router = express.Router()
const userController = require ('../controllers/users.controller')
const eventController = require('../controllers/event.controller')
const sessionMiddleware = require('../middlewares/session.middleware')
const uploads = require('../configs/cloudinary.config')


router.get('/login',userController.login)
router.get('/users', userController.createUser)
router.post('/logout', sessionMiddleware.isAuthenticated, userController.logout);
router.post('/user/addName', sessionMiddleware.isAuthenticated, userController.addName)

router.get('/event/:id', eventController.detailEvent)
router.get('/events', sessionMiddleware.isAuthenticated, eventController.eventsAll)
router.get('/createEvent',eventController.createEvent)
router.post('/event',eventController.saveEvent)
router.get('/share/:id',eventController.share)
router.get('/delete/:id', sessionMiddleware.isAuthenticated, eventController.deleteEvent)
router.get('/edit/:id', sessionMiddleware.isAuthenticated, eventController.editEvent)
router.post('/edit/:id', sessionMiddleware.isAuthenticated, eventController.modifyEvent)
router.get('/repeat/:id', sessionMiddleware.isAuthenticated, eventController.repeatEvent)

router.post('/assistant/add',eventController.add)
router.post('/assistant/delete',eventController.delete)









router.get('/', userController.index)



module.exports = router;

