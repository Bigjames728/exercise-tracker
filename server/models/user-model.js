const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Mongoose provides something called a pre-save hook. It's a function that mongoose runs just before saving a record to mongoDB.
// In this case, I want to hash a password just before it is stored in my database. I do this by calling the pre method on my schema.
// This method takes two arguments, the hook name and a function.

userSchema.pre('save', function(next) {
    var user = this; // this is assigned to the user object and all of its data. So now "user" holds all this data.
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

const User = mongoose.model('User', userSchema);

module.exports = User;



