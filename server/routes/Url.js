const express = require("express");
const validUrl = require("valid-url");
const router = express.Router();
const Url = require("../models/UrlSchema");

const randomeCode = (length = 5) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

router.post("/shorten", async (req, res) => {
  const { longUrl, userUrlCode } = req.body;
  var urlCode = "";

  // check base url if valid using the validUrl.isUri method
  if (!validUrl.isUri(req.get('origin'))) {
    return res.status(401).json("Invalid base URL");
  }

  // if user dont give a code, we create the url code
  if (!userUrlCode) {
    urlCode = randomeCode(5);
  } else {
    urlCode = userUrlCode;
  }

  // check long url if valid using the validUrl.isUri method
  if (validUrl.isUri(longUrl)) {
    try {
      /* The findOne() provides a match to only the subset of the documents 
            in the collection that match the query. In this case, before creating the short URL,
            we check if the long URL was in the DB ,else we create it.
            */
      let url = await Url.findOne({
        longUrl,
      });

      // url exist and return the respose
      if (url) {
        res.json(url);
      } else {
        // join the generated short code the the base url
        const shortUrl = req.get('origin') + "/" + urlCode;

        // invoking the Url model and saving to the DB
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      // exception handler
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});

module.exports = router;
