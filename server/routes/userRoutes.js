var express = require('express');
var router = express.Router();
let User = require('../models/user-model');

// GET USERS - This is specifically for getting a list of user usernames to fill out my dropdown menu 
router.get('/', function(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
});


// CREATE USER - When calling this method on the front end, the data should be added to the database
router.post('/register', (req, res, next) => {
  
  const user = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }
  const newUser = new User(user);
  req.session.user = user._id;
  newUser
    .save()
    .then((result) => {
      res.json({
        message: "Successfully created user.",
        auth: true,
      });
    })
    .catch((err) => {
      res.json({
        message: "Unable to create account.",
        auth: false,
      });
    });
});

// Login route
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUser(email, password);
  if (user) {
    req.session.user = user._id;
    res.json({
      message: "You are successfully logged in.",
      auth: true,
    })
  } else {
    res.json({
      message: "Unable to login.",
      auth: false,
    })
  }
  console.log(user)
});

module.exports = router;
