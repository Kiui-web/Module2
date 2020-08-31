const mongoose = require('mongoose')
const Event = require('../models/event.model')
const nodemailer = require('../configs/mailer.config')
const passport = require('passport')


module.exports.detailEvent = (req, res, next) => {
  Event.findById (req.params.id)
  .populate('user')
  .then(event => {
    if (event) {
      res.render('event/eventDetail', {event})
    }
  })
  .catch(next);
}

module.exports.createEvent = (req, res, next) => {
  const dateNow = new Date().toISOString().substr(0, 16);
    res.render('event/createEvent', {dateNow})
}

module.exports.saveEvent = (req, res, next) => {
  const {title, date, duration, description, latitude, longitud} = req.body
 console.log(req.body);
 console.log(req.session.userId);

 const event = new Event ({
  "user": req.session.userId,
  "title" : title,
  "date" : date,
  "duration": duration,
  "description" : description,
  "location": {
    "coordinates": [latitude, longitud]
  }
 })

 event.save()
      .then(event => {
        if (req.session.userId) {
          res.redirect(`/event/${event._id}`)
        } else {
          req.session.event = event._id
          res.redirect('/login')
        }
        
      })
      .catch(e => console.log(e))
 
}

module.exports.joinEvent = (req, res, next) => {
  console.log("Entrando en joinevent");
  res.render('/event/joinevent')
}