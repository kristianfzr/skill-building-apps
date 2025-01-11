const validGenders = ['male', 'female'];
const validActivityLevels = ['sedentary', 'lightly active', 'moderately active', 'very active', 'extra active'];
const validGoals = ['lose', 'maintain', 'gain'];

const activityLevelMultipliers = {
  sedentary: 1.2,
  'lightly active': 1.375,
  'moderately active': 1.55,
  'very active': 1.725,
  'extra active': 1.9,
};

const goalAdjustments = {
  lose: -500,
  maintain: 0,
  gain: 500,
};

module.exports = { validGenders, validActivityLevels, validGoals, activityLevelMultipliers, goalAdjustments };
