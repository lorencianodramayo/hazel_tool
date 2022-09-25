const express = require("express");
const router = express.Router();

const { getPartner, getTemplates, getTemplateSelected } = require('../helpers/adlib');

router.get("/", (req, res) => {
    const { platform, conceptId } = req.query;
    return getPartner(conceptId, platform, res);
});

router.get("/templates", (req, res) => {
    req.setTimeout(60000 * 2);

    const { platform, conceptId, partnerId } = req.query;
    return getTemplates(platform, conceptId, partnerId, res);
});

router.get("/templateSelected", (req, res) => {
    req.setTimeout(60000 * 2);

    const { platform, templateId, partnerId } = req.query;
    return getTemplateSelected(platform, templateId, partnerId, res);
})

module.exports = router;