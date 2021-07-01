const express = require("express");

const router = express.Router();
const path = require("path");
const Url = require("../models/UrlSchema");

// GET /:code
router.get("/:code", async (req, res) => {
  try {
    // find a document match to the code in req.params.code
    const url = await Url.findOne({
      urlCode: req.params.code,
    });
    if (url) {
      // when valid we perform a redirect
      return res.redirect(url.longUrl);
    } else {
      // else return a not found 404 status
      return res
        .status(404)
        .sendFile(path.join(__dirname ,"..","..", "/build/index.html"));
    }
  } catch (err) {
    // exception handler
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
