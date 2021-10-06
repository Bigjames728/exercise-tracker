var express = require('express');
var router = express.Router();
let Exercise = require('../models/exercise-model');
const JWT_SECRET = 'djflsen;avn;sunen;uoerhf;asj;ejrh98734n;klfjsah34987yawsf4ejkf';
let User = require('../models/user-model');


// GET EXERCISES - home page
router.get('/', function(req, res, next) {

    const token = req.headers['x-access-token']
    

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', exercise: user.exercise  })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
    // Exercise.find()
    // .then(exercises => res.json(exercises))
    // .catch(err => res.status(400).json('Error:' + err));
});

router.post('/add', function(req, res, next) {

    const token = req.headers['x-access-token']
    

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const email = decoded.email
        const user = await User.updateOne(
            { email: email },
            { $set: { exercise: req.body.exercise } }
        )

        return { status: 'ok' }
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
    // Exercise.find()
    // .then(exercises => res.json(exercises))
    // .catch(err => res.status(400).json('Error:' + err));
});


// GET SPECIFIC EXERCISE
router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});


// CREATE EXERCISE
// router.post('/add', (req, res, next) => {
//   const { username, description, duration, date } = req.body;

//   const newExercise = new Exercise({
//       username,
//       description,
//       duration,
//       date
//   })
//   newExercise.save()
//     .then(() => res.json(newExercise))
//     .catch((err) => res.status(400).json('Error: ' + err));
// });


// UPDATE EXERCISE
router.put('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Errors: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// DELETE EXERCISE
router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;