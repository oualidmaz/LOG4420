var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.json({"api":"shopping-cart api"});
  });



module.exports = router;