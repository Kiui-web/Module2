const mongoose = require('mongoose')
const User = require('../models/user.model')
const Event = require('../models/event.model')
const passport = require('passport')
const sessionstorage = require('sessionstorage');


const updateId = (req, res) => {
    if (req.session.event) {
        Event.findByIdAndUpdate(req.session.event, {"user" : req.session.userId})
            .then(event => {
                const eventID = req.session.event
                res.redirect(`/event/${eventID}`)
            })
    } else {
        res.redirect('events')
    }
}

module.exports.login = (req, res, next) => {
    res.render('users/login')
}


module.exports.createUser = (req, res, next) => {
    const numberCompleted = `+${req.query.number.trim()}`
    
    User.findOne({ number: numberCompleted}) 
        .then(user => {

            if (user !== null) {
                req.session.userId = user._id
                updateId(req, res)
            } else {
                const user = new User ({
                    number: numberCompleted
                })
            
                user.save()
                    .then(user => {
                        req.session.userId = user._id
                        updateId(req, res)
                    })
                    .catch(next)
            }
        })
        .catch(next)
}

module.exports.index = (req, res, next) => {
    User.findById(req.session.userId)
    .then (userMenu => {
        if (userMenu) {
            res.render('index', {userMenu})
        } else {
            res.render('index')
        }
    })
    .catch(e => next(e))
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

module.exports.addName = (req, res, next) => {
    const {idUser, nameUser} = req.body

    User.findByIdAndUpdate(idUser, { $set : { "name" : nameUser}})
        .then(user => {
            
            User.findById(idUser)
                .then(user => {
                    res.json(user)
                })
                .catch(next)
            
        })
        .catch(next)
}


module.exports.upDateProfile = (req, res, next) => {
    const name = req.body.name
    let obj = ""
    if (req.file === undefined) {
         obj = {"name" : name}
    } else {
        const fileAvatar = req.file.path
        obj = {"name" : name, "avatar" : fileAvatar}
    }
    
    User.findByIdAndUpdate(req.params.id, { $set : obj})
        .then (user => {
            res.json(user)
        })
        .catch(next)
}