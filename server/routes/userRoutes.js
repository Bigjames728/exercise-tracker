var express = require('express');
var router = express.Router();
let User = require('../models/user-model');

// GET USERS - This is specifically for getting a list of user usernames to fill out my dropdown menu 
router.get('/', function(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
});

// GET USERS - when calling this method on the front end, the user should be seeing the registration form 
// router.get('/register', function(req, res, next) {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error:' + err));
// });

// This should post data to the /login route after a user logs in - need to create a login form on front end for this end point
router.post('/login', function(req, res, next) {
  return res.send('Logged in!');
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
