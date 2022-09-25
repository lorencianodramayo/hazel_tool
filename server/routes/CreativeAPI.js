const express = require("express");
const router = express.Router();

// models
const CreativeModel = require("../models/CreativeModel");
const VariantsModel = require("../models/VariantsModel");

router.get("/getCreative", (req, res) => {
    CreativeModel.findById(req?.query?.creativeId, (err, success) => {
        return err
            ? res.status(500).json({ msg: "Sorry, Internal server error" })
            : res.json(success);
    }).sort([["_id", 1]]);
});

router.get("/getVariants", (req, res) => {
    VariantsModel.findOne({ "templateId": req?.query?.creativeId }, (err, success) => {
        return err
            ? res.status(500).json({ msg: "Sorry, Internal server error" })
            : res.json(success);
    });
});

module.exports = router;