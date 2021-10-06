var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
let User = require('../models/user-model');
const JWT_SECRET = 'djflsen;avn;sunen;uoerhf;asj;ejrh98734n;klfjsah34987yawsf4ejkf';

// GET USERS
router.get('/', function(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
});

// GET /register

// CREATE USER - POST /register
router.post('/register', async (req, res, next) => {

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {

    const newUser = new User({
      email,
      username,
      password
    });

    newUser.save()
    res.json({ status: 'ok', newUser });

  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate username' })
  }
});

// CREATE USER - POST /login
router.post('/login', async (req, res, next) => {
  
  const user = await User.findOne({ 
    email: req.body.email, 
    password: req.body.password 
  })

  if (user) {

    const token = jwt.sign({
      email: user.email
    }, JWT_SECRET, {expiresIn: '1hr'})

    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

module.exports = router;
