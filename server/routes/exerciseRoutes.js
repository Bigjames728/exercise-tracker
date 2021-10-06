var express = require('express');
var router = express.Router();
let Exercise = require('../models/exercise-model');


// GET EXERCISES
router.get('/', function(req, res, next) {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error:' + err));
});


// GET SPECIFIC EXERCISE
router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});


// CREATE EXERCISE
router.post('/add', (req, res, next) => {
  const { username, description, duration, date } = req.body;

  const newExercise = new Exercise({
      username,
      description,
      duration,
      date
  })
  newExercise.save()
    .then(() => res.json(newExercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});


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