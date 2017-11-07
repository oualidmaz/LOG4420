var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.json({"api":"orders api"});
  });


module.exports = router;