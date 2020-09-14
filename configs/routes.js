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
router.post('/update/:id', sessionMiddleware.isAuthenticated, uploads.single('file-image'), userController.upDateProfile)


router.get('/event/:id', sessionMiddleware.isNotAuthenticated, eventController.detailEvent)
router.get('/events', sessionMiddleware.isAuthenticated, eventController.eventsAll)
router.get('/createEvent',sessionMiddleware.isNotAuthenticated, eventController.createEvent)
router.post('/event',sessionMiddleware.isNotAuthenticated, eventController.saveEvent)
router.get('/share/:id',sessionMiddleware.isNotAuthenticated, eventController.share)
router.get('/delete/:id', sessionMiddleware.isAuthenticated, eventController.deleteEvent)
router.get('/edit/:id', sessionMiddleware.isAuthenticated, eventController.editEvent)
router.post('/edit/:id', sessionMiddleware.isAuthenticated, eventController.modifyEvent)
router.get('/repeat/:id', sessionMiddleware.isAuthenticated, eventController.repeatEvent)

router.post('/assistant/add',sessionMiddleware.isNotAuthenticated, eventController.add)
router.post('/assistant/delete',sessionMiddleware.isNotAuthenticated, eventController.delete)











router.get('/', userController.index)



module.exports = router;

