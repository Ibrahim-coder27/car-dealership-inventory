const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
    res.status(501).json({
        success: false,
        message: "Not implemented"
    });
});

module.exports = router;