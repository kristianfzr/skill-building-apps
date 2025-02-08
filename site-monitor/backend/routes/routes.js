const axios = require('axios');
const express = require('express');
const router = express.Router();
const Site = require('../schemas/siteSchema');
const Organization = require('../schemas/organizationSchema');

// ✅ Helper Function: Validate URL
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

// ✅ GET All Sites for an Organization
router.get('/sites/:orgId', async (req, res) => {
    try {
        const sites = await Site.find({ organization: req.params.orgId });

        if (!sites.length) {
            return res.status(404).json({ message: "No sites found for this organization." });
        }

        res.json(sites);
    } catch (error) {
        console.error("Error fetching sites:", error);
        res.status(500).json({ error: "Error fetching sites." });
    }
});

// ✅ GET Site by ID (Only Within Organization)
router.get('/sites/:orgId/:siteId', async (req, res) => {
    try {
        const { orgId, siteId } = req.params;

        // Find the site that belongs to the given organization
        const site = await Site.findOne({ _id: siteId, organization: orgId });

        if (!site) {
            return res.status(404).json({ error: "Site not found or does not belong to this organization" });
        }

        res.json(site);
    } catch (error) {
        console.error("Error fetching site:", error);
        res.status(500).json({ error: "Error fetching the site." });
    }
});

// ✅ ADD a New Site to an Organization
router.post('/sites', async (req, res) => {
    try {
        const { url, organizationId } = req.body;

        if (!url || !isValidUrl(url)) {
            return res.status(400).json({ error: "Invalid URL" });
        }

        // Check if organization exists
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(400).json({ error: "Invalid organization ID" });
        }

        // Check if site already exists in this organization
        const existingSite = await Site.findOne({ url, organization: organizationId });
        if (existingSite) {
            return res.status(400).json({ error: "Site already exists in this organization" });
        }

        // Create and save new site
        const newSite = new Site({ url, organization: organizationId });
        await newSite.save();

        res.status(201).json({ message: "Site added successfully", site: newSite });
    } catch (error) {
        console.error("Error adding site:", error);
        res.status(500).json({ error: "An error occurred while adding the site." });
    }
});

// ✅ GET Site Status (Ping Check)
router.get('/site-monitor/:orgId', async (req, res) => {
    try {
        const sites = await Site.find({ organization: req.params.orgId });

        if (!sites.length) {
            return res.status(404).json({ message: "No sites found for this organization." });
        }

        const siteStatuses = await Promise.all(
            sites.map(async (site) => {
                try {
                    const response = await axios.get(site.url);
                    return { id: site._id, url: site.url, status: response.status };
                } catch (error) {
                    return { id: site._id, url: site.url, status: "Error", error: error.message };
                }
            })
        );

        res.json(siteStatuses);
    } catch (error) {
        console.error("Error fetching site statuses:", error);
        res.status(500).json({ error: "Error fetching site statuses." });
    }
});

module.exports = router;
