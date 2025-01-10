const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal (Healthy)';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obese';
};

app.post('/bmi', (req, res) => {
    const { weight, height } = req.body;
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        return res.status(400).json({ error: 'Invalid input values' });
    }
    
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    const category = getBMICategory(bmi);
    res.json({ bmi, category });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})