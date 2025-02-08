const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const router = require('./routes/routes'); // Import the router

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for flexibility

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}:27017/siteMonitor?authSource=admin`, {
})
    .then(() => console.log("Connected to MongoDB!"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(express.json()); // Allow JSON body parsing
app.use(cors()); // Enable CORS for frontend connections

app.use('/', router); // Prefix all routes with `/api`

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
