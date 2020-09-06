const mongoose = require('mongoose')
const User = require('../models/user.model')
const Event = require('../models/event.model')
const passport = require('passport')
const sessionstorage = require('sessionstorage');



module.exports.login = (req, res, next) => {
    res.render('users/login')
}



module.exports.signup = (req, res, next) => {
    res.render('users/signup')
}

module.exports.createUser = (req, res, next) => {
    const numberCompleted = `+${req.query.number.trim()}`
 
    User.find({ number: numberCompleted}) 
        .then(user => {
            if (user.length !== 0) {
                req.session.userId = user._id
                if (req.session.event) {
                    Event.findByIdAndUpdate(req.session.event, {"user" : req.session.userId})
                        .then(event => {
                            const eventID = req.session.event
                            res.redirect(`/event/${eventID}`)
                        })
                } else {
                    res.redirect('events')
                }

            } else {
                const user = new User ({
                    number: numberCompleted
                })
            
                user.save()
                    .then(user => {
                        req.session.userId = user._id
                        if (req.session.event) {
                            Event.findByIdAndUpdate(req.session.event, {"user" : req.session.userId})
                                .then(event => {
                                    const eventID = req.session.event
                                    res.redirect(`/event/${eventID}`)
                                })
                        } else {
                            res.redirect('events')
                        }

                    })
                    .catch(next)
            }
        })
        .catch(next)

        

}

module.exports.index = (req, res, next) => {
    res.render('index')
}

module.exports.logout = (req, res, next) => {
    req.session.destroy()
    res.redirect('/')
}

module.exports.profile = (req, res, next) => {
    User.findById(req.session.userId)
        .then (user => {
            if (user) {
                res.render('users/profile', {user})
            } 
        })
        .catch(e => next(e))
}

