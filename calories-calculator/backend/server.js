const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = parseInt(process.env.PORT) || 5000;

app.use(express.json());
app.use(cors());
// Helper function to check if the input values are valid
const isValidInput = (weight, height, age, gender, activityLevel, goal) => {
  const validGenders = ['male', 'female'];
  const validActivityLevels = ['sedentary', 'lightly active', 'moderately active', 'very active', 'extra active'];
  const validGoals = ['lose', 'maintain', 'gain'];

  return (
    weight > 0 &&
    height > 0 &&
    age > 0 &&
    validGenders.includes(gender) &&
    validActivityLevels.includes(activityLevel) &&
    validGoals.includes(goal)
  );
};

// Activity level multipliers based on TDEE formula
const activityLevelMultipliers = {
  sedentary: 1.2,
  'lightly active': 1.375,
  'moderately active': 1.55,
  'very active': 1.725,
  'extra active': 1.9,
};

// Adjustment values based on goal
const goalAdjustments = {
  lose: -500,
  maintain: 0,
  gain: 500,
};

app.post('/calories-calculator', (req, res) => {
  try {
    const { weight, height, age, gender, activityLevel, goal } = req.body;

    if (!isValidInput(weight, height, age, gender, activityLevel, goal)) {
      return res.status(400).json({ error: 'Invalid input values' });
    }

    const bmr =
      gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const activityMultiplier = activityLevelMultipliers[activityLevel];
    const tdee = bmr * activityMultiplier;

    const calorieAdjustment = goalAdjustments[goal];
    const calories = tdee + calorieAdjustment;

    res.json({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(calories),
      input: { weight, height, age, gender, activityLevel, goal },
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
  console.log('Received data:', req.body);
});

// Server port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
