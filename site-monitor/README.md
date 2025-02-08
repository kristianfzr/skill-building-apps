# **Site Monitor API**

## ** Overview**
The **Site Monitor API** allows users to **add, retrieve, and monitor websites** within an organization.  
It enables **organizations** to track multiple sites and determine their **status (UP/DOWN)** via periodic health checks.

---

### **Install Dependencies**
```bash
npm install
```

### **Setup MongoDB & Environment Variables**
Create a `.env` file in the **backend directory**:
```
MONGO_USER=root
MONGO_PASSWORD=example
MONGO_URI=localhost  # Use your Docker/WSL2 IP if needed
PORT=5000
```

### **Start the Backend**
```bash
npm run start-backend
```
For development mode (with auto-restart on file changes):
```bash
npm run start-dev-backend
```

---

## **API Endpoints**
### **Get All Sites for an Organization**
**GET** `/sites/:orgId`  
Retrieves **all sites** for a given organization.

#### **Request**
```bash
curl -X GET http://localhost:5000/sites/65c8e1d6b3c14f52f678aa9e
```

#### **Response**
```json
[
    {
        "_id": "65c8e1d6b3c14f52f678cc3",
        "url": "https://example.com",
        "organization": "65c8e1d6b3c14f52f678aa9e",
        "status": "unknown",
        "createdAt": "2025-01-31T12:15:00Z"
    }
]
```

---

### **Get a Single Site in an Organization**
**GET** `/sites/:orgId/:siteId`  
Retrieves **one site** by its ID, ensuring it belongs to the specified organization.

#### **Request**
```bash
curl -X GET http://localhost:5000/sites/65c8e1d6b3c14f52f678aa9e/65c8e1d6b3c14f52f678cc3
```

#### **Response**
```json
{
    "_id": "65c8e1d6b3c14f52f678cc3",
    "url": "https://example.com",
    "organization": "65c8e1d6b3c14f52f678aa9e",
    "status": "unknown",
    "createdAt": "2025-01-31T12:15:00Z"
}
```

---

### **Add a New Site to an Organization**
**POST** `/sites`  
Allows an organization to add a **new site for monitoring**.

#### **Request**
```bash
curl -X POST http://localhost:5000/sites \
     -H "Content-Type: application/json" \
     -d '{
           "url": "https://example.com",
           "organizationId": "65c8e1d6b3c14f52f678aa9e"
         }'
```

#### **Response**
```json
{
    "message": "Site added successfully",
    "site": {
        "_id": "65c8e1d6b3c14f52f678cc3",
        "url": "https://example.com",
        "organization": "65c8e1d6b3c14f52f678aa9e",
        "status": "unknown",
        "createdAt": "2025-01-31T12:15:00Z"
    }
}
```

---

## **Server Setup (`server.js`)**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/routes');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}:27017/siteMonitor?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB!"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```
## TODO
There are still missing peaces to this app, this was created just so I can learn specific concepts and how some things work.
---
