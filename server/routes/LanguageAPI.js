const express = require("express");
const router = express.Router();


const LanguageModel = require("../models/LanguageModel");

router.post("/addLanguage", (req, res) => {
    const language = new LanguageModel(req.body);

    language.save((error, result) => {
        if (error) {
            return res
                .status(500)
                .json({ msg: "Sorry, internal server errors" });
        }

        return res.status(200).json(result)
    });
});

router.get("/getLanguage", (req, res) => {
    LanguageModel.find({}, (err, success) => {
        return err
            ? res.status(500).json({ msg: "Sorry, Internal server error" })
            : res.json(success);
    });
});



module.exports = router;