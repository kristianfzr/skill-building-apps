import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState('') 
  const [error, setError] = useState('')
  
  const calculateBmi = async () => {
    try  {
      const response = await axios.post('http://localhost:5000/bmi', {
        weight: parseFloat(weight),
        height: parseFloat(height)
      })
      
      const { bmi, category } = response.data;
      setBmi(`${bmi} (${category})`);
      setError('')
    } catch (error) {
      setBmi(null)
      setError(error.response?.data?.error || 'An error occurred')
    }
  }
  
  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <div>
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          />
          <button onClick={calculateBmi}>Calculate BMI</button>
          {bmi && <p>Your BMI is: {bmi}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  )
}

export default App
