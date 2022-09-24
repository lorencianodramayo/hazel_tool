const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.body);

    return res.status(200).json(req.body)
});

router.post("/bucket", (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body)
});

router.post("/generation", (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body)
})

module.exports = router;