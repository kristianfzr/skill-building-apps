const mongoose = require('mongoose');
require('dotenv').config();
const Organization = require('./schemas/organizationSchema')
const User = require('./schemas/userSchema')
const Site = require('./schemas/siteSchema');

// connection to mongo
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}:27017/siteMonitor?authSource=admin`).then(() => {
    console.log('Connected to MongoDB!');
}).catch((error) => {
    console.log('Error while connecting to MongoDB:', error)
});

// Create Organization
const createOrganization = async () => {
    const org = new Organization({ name: "Tech Corp "});
    await org.save()
    console.log("Organization Created:", org);
    mongoose.disconnect();
};

// Create User
const createUser = async () => {
    const orgId = '67a7821a167a4bb1885a31d2';
    const user1 = new User ({
        username: "john_doe",
        email: "john@example.com",
        password: "hashedpassword",
        organization: orgId,
        role: "admin"
    });
    
    await user1.save();
    
    console.log("User Created: ", user1);
    mongoose.disconnect();
};

const createSite = async () => {
    const orgId = '67a7821a167a4bb1885a31d2';
    const site = new Site({
        url: "https://example.com",
        organization: orgId
    });
    
    await site.save()
    console.log("Site Created: ", site);
    
    mongoose.disconnect()
}

// Create a site for the Organization


//createOrganization();
//createUser();
createSite();


