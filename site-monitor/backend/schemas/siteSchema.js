const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    lastChecked: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["up", "down", "unknown"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Site = mongoose.model("Site", siteSchema);
module.exports = Site;