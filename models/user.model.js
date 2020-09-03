const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const NUMBER_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;



const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    number: {
        type: Number,
        required: [true, "Number is required"],
        trim : true,
        match: [NUMBER_PATTERN, "Number is invalid"]
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dbldxawid/image/upload/v1598365694/Kiui/user_lqfimt.png'
    }
},
{   timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)


const User = mongoose.model('User', userSchema)

module.exports = User;
