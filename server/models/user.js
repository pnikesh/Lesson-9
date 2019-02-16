// require module for user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
    userName: {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    /*password:{
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    }*/
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'email is required'
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'displayname is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
        collection: "users"
}        
);

let options = ({
    missingPasswordError: "Wrong Password"
});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userSchema);