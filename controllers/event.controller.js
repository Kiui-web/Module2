const mongoose = require('mongoose')
const Event = require('../models/event.model')
const nodemailer = require('../configs/mailer.config')
const passport = require('passport')


module.exports.go = (req, res, next) => {
  res.render('event/events')
}

module.exports.createEvent = (req, res, next) => {
  console.log("Hola evento");
  res.render('event/createEvent')
}