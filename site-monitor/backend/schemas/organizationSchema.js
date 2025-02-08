const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAd: {
        type: Date,
        default: Date.now
    }
});

const Organization = mongoose.model("Organization", organizationSchema)
module.exports = Organization;