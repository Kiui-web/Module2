const mongoose = require('mongoose')
const User = require('../models/user.model')
const nodemailer = require('../configs/mailer.config')
const passport = require('passport')

module.exports.login = (req, res, next) => {
    res.render('users/login')
}

//module.exports.doLogin = 

module.exports.signup = (req, res, next) => {
    res.render('users/signup')
}

module.exports.index = (req, res, next) => {
    res.render('index')
}
