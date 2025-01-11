import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    activityLevel: '',
    goal: '',
  });

  const [error, setError] = useState('');
  const [calories, setCalories] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateCalories = async () => {
    const { height, weight, age, gender, activityLevel, goal } = formData;

    // Basic validation
    if (!height || !weight || !age || !gender || !activityLevel || !goal) {
      setError('Please fill in all fields');
      setCalories(null);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/calories-calculator', {
        weight: parseFloat(weight),
        height: parseFloat(height),
        age: parseFloat(age),
        gender,
        activityLevel,
        goal,
      });

      const { bmr, tdee, calories } = response.data;
      setCalories({ bmr, tdee, calories });
      setError('');
    } catch (error) {
      setCalories(null);
      if (error.response?.status === 400) {
        setError('Invalid input values. Please check your entries.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  }
    return (
      <div className="App">
        <h1>Calories Calculator</h1>
        <div className="form">
          <input
            type="number"
            placeholder="Height (cm)"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="number"
            placeholder="Weight (kg)"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
          <br />
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleInputChange}
          >
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary</option>
            <option value="lightly active">Lightly Active</option>
            <option value="moderately active">Moderately Active</option>
            <option value="very active">Very Active</option>
            <option value="extra active">Extra Active</option>
          </select>
          <br />
          <select name="goal" value={formData.goal} onChange={handleInputChange}>
            <option value="">Select Goal</option>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
          <br />
          <button onClick={calculateCalories}>Calculate Calories</button>
        </div>

        <div className="result">
          {calories && (
            <div>
              <p><strong>BMR:</strong> {calories.bmr} kcal</p>
              <p><strong>TDEE:</strong> {calories.tdee} kcal</p>
              <p><strong>Calories for Goal:</strong> {calories.calories} kcal</p>
            </div>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    );
  }

  export default App
