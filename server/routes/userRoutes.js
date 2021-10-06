var express = require('express');
var router = express.Router();
let User = require('../models/user-model');

// GET USERS
router.get('/', function(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
});

// CREATE USER
router.post('/add', (req, res, next) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
