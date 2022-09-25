const express = require("express");
const router = express.Router();

// models
const CreativeModel = require("../models/CreativeModel");
const VariantsModel = require("../models/VariantsModel");

// helpers
const { save2Cloud } = require("../helpers/bucket");

router.post("/", (req, res) => {
    const creative = new CreativeModel(req.body);

    creative.save((error, result) => {
        if (error) {
            return res
                .status(500)
                .json({ msg: "Sorry, internal server errors" });
        }

        return res.status(200).json(result)
    });
});

router.post("/bucket", async (req, res) => {
    let result = await save2Cloud(req?.body?.templateUrl, req?.body?.templateId, req.get('referer'));

    if(result){
        return res.status(200).json({ message: 'Upload' })
    }
});

router.post("/generation", (req, res) => {
    const variants = new VariantsModel(req.body);

    variants.save((error, result) => {
        if (error) {
            return res
                .status(500)
                .json({ msg: "Sorry, internal server errors" });
        }

        return res.status(200).json(result)
    });
})

module.exports = router;