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




module.exports.eventsAll = (req, res, next) => {
  Event.find({ "user" : req.session.userId})
      .populate('user')
      .then(events => {
        if (events) {
          const dateNow = new Date().toISOString().substr(0, 16)
            events = events.map(event => {
            const hour = event.date.toISOString().slice(11, 16)
            const day = event.date.toISOString().slice(08, 10)
            const month = event.date.toISOString().slice(05, 07)
            const mNames = monthName(month)
            return {
              "user" : event.user,
              "date" : event.date,
              "duration" : event.duration,
              "title" : event.title,
              "description" : event.description,
              "image" : event.image,
              "location" : event.location,
              "assistants" : event.asisstants,
              "hour" : hour,
              "day" : day,
              "month": mNames
            }
          })

          const eventPast = events.filter(event => {
            return event.date.toISOString() < dateNow
          })
          const eventPresent = events.filter(event => {
            return event.date.toISOString() >= dateNow
          })


          res.render('event/events', {eventPast, eventPresent})
        }
      })
      .catch(next);
}

module.exports.joinEvent = (req, res, next) => {
  console.log("Entrando en joinevent");
  res.render('event/joinevent')
}



function monthName (month) {
  let name = ""
  switch (month) {
    case "01" : name = "ENE";
      break;
    case "02" : name = "FEB";
      break;
    case "03" : name = "MAR";
      break;
    case "04" : name = "ABR";
      break;
    case "05" : name = "MAY";
      break;
    case "06" : name = "JUN";
      break;
    case "07" : name = "JUL";
      break;
    case "08" : name = "AGO";
      break;
    case "09" : name = "SEP";
      break;
    case "10" : name = "OCT";
      break;
    case "11" : name = "NOV";
      break;
    case "12" : name = "DIC";
      break;
  }
    return name
}

