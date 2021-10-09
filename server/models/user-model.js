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
// authenticate input against database documents (in mongoose, the statics object lets you add methods directly to the model)
userSchema.statics.authenticate = function (email, password, callback) {
    //Tell mongoose to set up a query to find the document with the users email. Then, use the exec method to perform the search 
    //and provide a callback to process the results.
    User.findOne({ email: email })
        .exec(function (error, user) {
            if (error) {
                return callback(error);
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            // The compare method takes three args. A plain text password (what user types into form), the hashed 
            // password (from retrieved database document), and a callback function. The compare method returns an err
            // if something goes wrong or a result (a simple boolean value) true if passwords match, false if they don't.
            bcrypt.compare(password, user.password, function(error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        })
}
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



