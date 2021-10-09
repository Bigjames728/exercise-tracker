var express = require('express');
var router = express.Router();
let User = require('../models/user-model');

// GET USERS - This is specifically for getting a list of user usernames to fill out my dropdown menu 
router.get('/', function(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
});

// Not sure what this is for yet. This should respond/return the logged in persons session as an object I think for me to access from the front end where I call this endpoint
router.get('/getUser', function(req, res, next) {
  if (! req.session.userId) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.json({user}) // I think this should return the user object
      }
    })
});

// This should post data to the /login route after a user logs in - need to create a login form on front end for this end point
// Line 41 is confusing still. In the video on treehouse, he writes line 41 then does a redirect to a profile view. But I'm
// using React for front end so need to figure this out. Same with the register route on line 68.
// Right now, the app creates a session whenever a user logs in.
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.')
        err.status = 401;
        return next(err);
      } else {
        // req.session.userId = user._id;
        const sessUser = { id: user._id, email: user.email, username: user.username };
        req.session.user = sessUser;
        return res.json({ msg: "Logged in successfully", sessUser });
        // console.log(req.session.userId);
        // console.log(req.session);
      }
    });
  } else {
    var err = new Error('Email and password are required.')
    err.status = 401;
    return next(err);
  }
})


// CREATE USER - When calling this method on the front end, the data should be added to the database
router.post('/register', (req, res, next) => {
  
  if (req.body.email && req.body.username && req.body.password) {
    const newUserData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    // use schema's 'create' method to insert the document into MongoDB
    User.create(newUserData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.json(newUserData);
      }
    })
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
