const mongoose = require('mongoose')
const User = require('../models/user.model')
const nodemailer = require('../configs/mailer.config')
const passport = require('passport')

module.exports.index = (req, res, next) => {
    res.render('index')
}
