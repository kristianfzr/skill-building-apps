const { validGenders, validActivityLevels, validGoals } = require('./constants');

// Helper function to check if the input values are valid
const isValidInput = (weight, height, age, gender, activityLevel, goal) => {
  return (
    weight > 0 &&
    height > 0 &&
    age > 0 &&
    validGenders.includes(gender) &&
    validActivityLevels.includes(activityLevel) &&
    validGoals.includes(goal)
  );
};

module.exports = { isValidInput };
