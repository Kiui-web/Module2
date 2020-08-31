const mongoose = require('mongoose')
const User = require('../models/user.model')
const Event = require('../models/event.model')
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
                    if (user.activation.active) {
                        req.session.userId = user._id
                        if (req.session.event) {
                            Event.findByIdAndUpdate(req.session.event, {"user" : req.session.userId})
                                .then(event => {
                                    const eventID = req.session.event
                                    res.redirect(`/event/${eventID}`)
                                })
                        } else {
                            res.redirect('event/events')
                        }
                        
                    } else {
                        res.render('users/login', {
                            error: {
                                validation: {
                                    message: 'Tu cuenta de usuario aún no ha sido activada'
                                }
                            }
                        })
                    }
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

module.exports.createUser = (req, res, next) => {
    console.log("req.body");
     const user = new User ({
         ...req.body,
         avatar: req.file ? req.path.file: undefined
     });
    console.log(req.body);
    user.save()
    .then(user => {
        nodemailer.sendValidationEmail(user.email, user.activation.token, user.name);
        res.render('users/login', {
            message: 'Comprueba tu correo electrónico para confirmar la cuenta'
        });
    })
    .catch(error =>{
        console.log(error);
        //La siguiente linea, el Tweethack sale como mongoose.Error.sendValidationEmail, creo que estaba mal puesta...
         if (error instanceof mongoose.Error.ValidationError) {
             console.log("Eres tonto");
             res.render('users/signup', { error: error.errors, user})
         } else if(error.code === 11000) {
             res.render('users/signup', { 
                 user,
                 error: {
                     email: {
                         message: "El usuario ya existe"
                     }
                 } 
             })
         } else {
             next(error)
         }
    })
    .catch(next)
}

module.exports.activateUser = (req, res, next) => {
    User.findOne({"activation.token": res.params.token})
    .then(user => {
        if (user) {
            user.activation.active = true;
            user.save()
            .then(user => {
                res.render('users/login', {
                    message: 'Tu cuenta ha sido activada!'
                })
            }).catch(err => next)
        } else {
            res.render('users/login', {
                error: {
                    validation: {
                        message: 'El enlace no es correcto'
                    }
                }
            })
        }
    }).catch(err => next)
}

module.exports.index = (req, res, next) => {
    res.render('index')
}

