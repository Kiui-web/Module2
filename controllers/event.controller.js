const mongoose = require('mongoose')
const Event = require('../models/event.model')
const passport = require('passport')
const shortUrl = require('node-url-shortener');
const User = require('../models/user.model');

module.exports.detailEvent = (req, res, next) => {
  Event.findById(req.params.id)
  .populate('user')
  .populate('assistants.creator')
  .then(eventDetail => {
    const latitud = eventDetail.location.coordinates[0]
    const longitud = eventDetail.location.coordinates[1]
    const hour = eventDetail.date.toISOString().slice(11, 16)
    const day = eventDetail.date.toISOString().slice(08, 10)
    const month = eventDetail.date.toISOString().slice(05, 07)
    const mNames = monthName(month)
    let googleMaps = `https://maps.google.com/?q=${latitud},${longitud}&z=17&t=m`

        shortUrl.short(googleMaps, function(err, url){
          googleMaps = url
        });

      
      const event = {
        "_id": eventDetail._id,
        "user" : eventDetail.user,
        "date" : eventDetail.date,
        "duration" : eventDetail.duration,
        "title" : eventDetail.title,
        "description" : eventDetail.description,
        "image" : eventDetail.image,
        "location" : eventDetail.location,
        "assistants" : eventDetail.assistants,
        "hour" : hour,
        "day" : day,
        "month": mNames,
        "googleMapsUrl" : googleMaps
      }
      
      res.render('event/eventDetails', {event, user: req.session.userId})
    })
  .catch(next);
}

module.exports.createEvent = (req, res, next) => {
  const dateNow = new Date().toISOString().substr(0, 16);
    res.render('event/createEvent', {dateNow})
}

module.exports.saveEvent = (req, res, next) => {
  const {title, date, duration, description, latitude, longitud, location} = req.body
 const event = new Event ({
  "user": req.session.userId,
  "title" : title,
  "date" : date,
  "duration": duration,
  "description" : description,
  "location": {
    "coordinates": [latitude, longitud],
    "name": location
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


module.exports.share = (req, res, next) => {
 Event.findById(req.params.id)
    .populate('user')
    .then(event => {
        const year = event.date.toISOString().slice(0, 4)
        const hour = event.date.toISOString().slice(11, 16)
        const day = event.date.toISOString().slice(08, 10)
        const month = event.date.toISOString().slice(05, 07)
        const mNames = monthName(month)
        const description = event.description
        const title = event.title
        const duration = event.duration
        const latitud = event.location.coordinates[0]
        const longitud = event.location.coordinates[1]
        const direction = event.location.name
        let googleMaps = `https://maps.google.com/?q=${latitud},${longitud}&z=17&t=m`
        let googleMapsNew = ""
        let assistant = ""

        const urlAssistant = `http://localhost:3000/event/${event._id}`

        for (let i = 1; i <= event.assistants.length; i++) {
          //assistant += `*${i}.* ${event.assistants[i - 1]}\n`
          assistant += '*' + i + '.* ```' + event.assistants[i - 1] + '```\n'
        }

        console.log(event.user.number);
        shortUrl.short(googleMaps, function(err, url){
          googleMapsNew = url
        
// const text = `
// 🍺🔊🎉⚽🍻🎁🎊🥃🥁🍾🍰


// *${title}*

// ${description}

// *Apuntate aquí*: ${urlAssistant}
          
// *Día:* ${day} de ${mNames} de ${year}
// *Hora:* ${day}
// *Lugar:* ${direction}
// ${url}

// *Duración:* ${duration} horas

// Asistentes:
// ${assistant}
        
//   Creado por kiui
//         `
const text = '🍺🔊🎉⚽🍻🎁🎊🥃🥁🍾🍰\n\n*' + title + '*\n\n```' + description + '```\n\n*Apuntate aquí:* ' +
            urlAssistant + '\n\n*Día:* ' + day + ' de ' + mNames + ' de ' + year + '\n*Hora:* ' + hour +
            '\n*Lugar:* ' + direction + '\n' + url + '\n\n*Duración:* ' + duration + ' horas\n\n_Asistentes:_\n\n' +
            assistant + '\n_Creado por kiui_';
            
            

console.log(text);

            const textFormat = encodeURIComponent(text)
            const whasapUrl = `https://wa.me/?text=${textFormat}`

            console.log(url);
            res.redirect(whasapUrl)

        })
      })
    .catch(next)
 }


module.exports.eventsAll = (req, res, next) => {
  
  Event.find({ "user" : req.session.userId})
      .populate('user')
      .populate('assistant')
      .then(events => {
        if (events) {
         
            const dateNow = new Date().toISOString().substr(0, 16)
            
            events = events.map(event => {
            const hour = event.date.toISOString().slice(11, 16)
            const day = event.date.toISOString().slice(08, 10)
            const month = event.date.toISOString().slice(05, 07)
            const mNames = monthName(month)
            return {
              "_id": event._id,
              "user" : event.user,
              "date" : event.date,
              "duration" : event.duration,
              "title" : event.title,
              "description" : event.description,
              "image" : event.image,
              "location" : event.location,
              "assistants" : event.assistants,
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
          User.findById(req.session.userId)
            .then(user => {
            res.render('event/events', {eventPast, eventPresent, user})
              
            })
            .catch(next)
        }
      })
      .catch(next);
}

module.exports.joinEvent = (req, res, next) => {
  console.log("Entrando en joinevent");
  res.render('event/joinevent')
}
module.exports.deleteEvent = (req, res, next) => {
  const idEvent = req.params.id

  console.log(idEvent);
    Event.findByIdAndDelete(idEvent)
      .then(event => {
        res.redirect('/events')
      })
      .catch(next)
}

module.exports.add = (req, res, next) => {
  const {idEvent, name} = req.body
  Event.findByIdAndUpdate(idEvent , {$push: {"assistants" : name }})
      .then (event => {

          Event.findById(idEvent)
              .then(event => {
                   res.json(event)
              })
              .catch(next)
        
      })
      .catch(next)
}


module.exports.delete = (req, res, next) => {
  const {idEvent, number} = req.body
  Event.findById(idEvent)
      .then (events => {
        const eventAssistant = events.assistants.filter((event, index) => {
          return index !== number
       })

       events.assistants = eventAssistant

        events.save()
        .then(event => {
          res.json(event)
        })
        .catch(next)

      })
      .catch(next)
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

