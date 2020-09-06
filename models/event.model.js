const mongoose = require("mongoose");

require('./user.model')


const eventSchema = new mongoose.Schema(
  {
    user: {
      //campo de relación con referencia al usuario creador del evento
      type: mongoose.Schema.Types.ObjectId,
      //referencia a qué modelo usa
      ref: "User"
    },
    date: {
            type: Date,
            required: true
    },
    duration: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
        required: true,
        maxlength: [ 48, "Title is too long"]
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: [Number],
      name: String
    },
    asisstants : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
  },
 );

// eventSchema.virtual("attendants", {
//   ref: "Attendant",
//   localField: "_id",
//   foreingField: "event",
//   justOne: true
// })

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
