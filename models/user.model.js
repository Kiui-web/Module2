const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const NUMBER_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;

const generateRandomToken = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = ''

    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length)]
    }
    return token
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [EMAIL_PATTERN, "Email is invalid"]
    },
    password: String,
    number: {
        type: Number,
        required: [true, "Number is required"],
        trim : true,
        match: [NUMBER_PATTERN, "Number is invalid"]
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dbldxawid/image/upload/v1598365694/Kiui/user_lqfimt.png'
    },
    activation: {
        active: {
            type: Boolean,
            default: false
        },
        token: {
            type: String,
            default: generateRandomToken
        }
    },
    social: {
        google: String,
        facebook: String
    }

},
{   timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash
                next();
            })
    } else {
        next();
    }
})

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare (password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User;
