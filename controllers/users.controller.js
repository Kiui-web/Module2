const mongoose = require('mongoose')
const User = require('../models/user.model')
const nodemailer = require('../configs/mailer.config')
const passport = require('passport')

module.exports.login = (req, res, next) => {
    res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
               //llamamos a la función de checkPassword en le modelo de usuario
               user.checkPassword(req.body.password)
               .then(match => {
                if (match) {
                    req.session.userId = user._id
                    res.redirect('/events')
                } else {
                    res.render('users/login', {
                        error: {
                            email: {
                                message: 'Usuario no encontrado'
                            }
                        }
                    })
                }   
               })
            } else {
                res.render('users/login', {
                    error: {
                        email: {
                            message: "Usuario no encontrado"
                        }
                    }
                })
            }
        })
} 

module.exports.signup = (req, res, next) => {
    res.render('users/signup')
}

module.exports.index = (req, res, next) => {
    res.render('index')
}
