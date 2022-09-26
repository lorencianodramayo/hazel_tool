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

router.put("/updateVariants", (req, res) => {
    const { name, variantId } = req.body;

    VariantsModel.findById(variantId, (err, success) => {
        if(err){
            return res.status(500).json({ msg: "Sorry, Internal server error" })
        }else{
            VariantsModel.findByIdAndUpdate(variantId, { "generation": success?.generation.filter((data) => data?.name !== name) }, (error, successEdit) => {
                return error
                    ? res.status(500).json({ msg: "Sorry, Internal server error" })
                    : res.json(successEdit);
            });
        }
    }).sort([["_id", 1]]);
})

module.exports = router;