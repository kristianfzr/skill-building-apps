const express = require('express');
const { calculateCalories } = require('../utils/calculator');
const { isValidInput } = require('../utils/inputValidation');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const { weight, height, age, gender, activityLevel, goal } = req.body;

    if (!isValidInput(weight, height, age, gender, activityLevel, goal)) {
      return res.status(400).json({ error: 'Invalid input values' });
    }

    const result = calculateCalories(weight, height, age, gender, activityLevel, goal);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
