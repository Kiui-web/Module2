const mongoose = require('mongoose')
const User = require('../models/user.model')
const Event = require('../models/event.model')
const nodemailer = require('../configs/mailer.config')
const passport = require('passport')
const admin = require('firebase-admin')
const serviceAccount = require("../public/js/init-firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://protean-set-284407.firebaseio.com"
});



// admin.initializeApp({
//     credential: admin.credential.cert({
//       type: process.env.FIREBASE_TYPE,
//       project_id: process.env.FIREBASE_PROJECT_ID,
//       private_key_id: process.env.FIREBASE_KEY_ID,
//       private_key: process.env.FIREBASE_KEY,
//       client_email: process.env.FIREBASE_CLIENT_EMAIL,
//       client_id: process.env.FIREBASE_CLIENT_ID,
//       auth_uri: process.env.FIREBASE_AUTH_URI,
//       token_uri: process.env.FIREBASE_TOKEN_URI,
//       auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
//       client_x509_cert_url: process.env.FIREBASE_CLIENT_X509,
//     }),
//     // apiKey: config.firebase.apiKey,
//     // authDomain: config.firebase.authDomain,
//     databaseURL: process.env.FIREBASE_DATABASEURL,
//     //storageBucket: config.firebase.storageBucket,
//   });
//   //   credential: admin.credential.cert(serviceAccount),
//   //   databaseURL: "https://protean-set-284407.firebaseio.com"



// This function runs when the 'sign-in-button' is clicked
// // Takes the value from the 'phoneNumber' input and sends SMS to that phone number
// function submitPhoneNumberAuth() {
    
//   const phoneNumber = phoneNumberInput.value;
//   const appVerifier = window.recaptchaVerifier;
//   admin
//     .auth()
//     .signInWithPhoneNumber(phoneNumber, appVerifier)
//     .then(function(confirmationResult) {
//         window.confirmationResult = confirmationResult;
//     })
//     .catch(function(error) {
//         console.log(error);
//     });
// }


module.exports.firebase = (req, res, next) => {
    const phoneNumber = req.body.phoneNumber;
    console.log(phoneNumber);
    global.recaptchaVerifier = new admin.auth.RecaptchaVerifier('recaptcha-container');
    const appVerifier = global.recaptchaVerifier;
  admin
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function(confirmationResult) {
        global.confirmationResult = confirmationResult;
        console.log('heheheheheehehe');
    })
    .catch(function(error) {
        console.log(error);
    });
}

module.exports.firebaseCode = (req, res, next) => {
    const code = req.body.code;
    confirmationResult
      .confirm(code)
      .then(result => {
          var user = result.user;
          console.log(result);
      })
      .catch(function(error) {
          console.log(error);
      });
}




// function submitPhoneNumberAuthCode() {
//   // We are using the test code we created before
//   // var code = document.getElementById("code").value;
//   const code = codeInput.value;
//   confirmationResult
//     .confirm(code)
//     .then(result => {
//         var user = result.user;
//         console.log(result);
//         //window.location.replace("http://localhost:3000/events");
//     })
//     .catch(function(error) {
//         console.log(error);
//     });
// }


module.exports.doSocialLoginGoogle = (req, res, next) => {
    const passportController = passport.authenticate("google", {
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo",
          'https://www.googleapis.com/auth/admin.directory.device.mobile.readonly'
        ]
      }, (error, user) => {
        if (error) {
          next(error);
        } else {
          req.session.userId = user._id;
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
      })
      
      passportController(req, res, next);
    }

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
                            res.redirect('events')
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
                            password: {
                                message: 'Email o contraseña incorrecta'
                            }
                        }
                    })
                }   
               })
            } else {
                res.render('users/login', {
                    error: {
                        password: {
                            message: "Email o contraseña incorrecta"
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





