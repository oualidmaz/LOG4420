var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.json({"api":"products api"});
  });


module.exports = router;