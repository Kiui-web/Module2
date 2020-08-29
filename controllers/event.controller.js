const mongoose = require('mongoose')
const Event = require('../models/event.model')
const nodemailer = require('../configs/mailer.config')
const passport = require('passport')


module.exports.go = (req, res, next) => {
  res.render('event/events')
}

module.exports.createEvent = (req, res, next) => {
  const dateNow = new Date().toISOString().substr(0, 16);
  res.render('event/createEvent', {dateNow})
}

module.exports.saveEvent = (req, res, next) => {
  console.log('asdf');
 console.log(req.body);
}

