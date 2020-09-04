const mongoose = require("mongoose");

const attendantSchema = new mongoose.Schema(
  {
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //Si conseguimos coger las cookies podrá ser true
      require: false,
    },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },
  },
  { timestamps: true}
)

const Attendant = mongoose.model("Attendant", attendantSchema)

module.exports = Attendant;