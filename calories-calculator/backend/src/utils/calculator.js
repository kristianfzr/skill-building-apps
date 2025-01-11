const { activityLevelMultipliers, goalAdjustments } = require('./constants');

const calculateCalories = (weight, height, age, gender, activityLevel, goal) => {
  const bmr =
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier = activityLevelMultipliers[activityLevel];
  const tdee = bmr * activityMultiplier;

  const calorieAdjustment = goalAdjustments[goal];
  const calories = tdee + calorieAdjustment;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calories: Math.round(calories),
    input: { weight, height, age, gender, activityLevel, goal },
  };
};

module.exports = { calculateCalories };
