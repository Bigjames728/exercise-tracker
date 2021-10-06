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
router.get('/register', function(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
});


// CREATE USER - When calling this method on the front end, the data should be added to the database
router.post('/register', (req, res, next) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
