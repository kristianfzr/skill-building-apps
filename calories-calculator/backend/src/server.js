const express = require('express');
require('dotenv').config();
const cors = require('cors');

const caloriesCalculatorRoutes = require('./routes/caloriesCalculator');

const app = express();
const port = parseInt(process.env.PORT) || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/calories-calculator', caloriesCalculatorRoutes);

// Server port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
