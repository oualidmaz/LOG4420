var express = require("express");
var router = express.Router();
var Product = require('../models/productModel');


// /api/products
router.get("/", function(req, res) {
    Product.find({}, function(err, product){
      if (err) throw err;
      res.json(product);
    });
  });


module.exports = router;