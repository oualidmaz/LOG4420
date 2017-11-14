var express = require("express");
var router = express.Router();
var Product = require('../models/productModel');


// get prudcts - /api/products
router.get("/:category?", function(req, res) {
    if(req.query.criteria){
        switch (req.query.criteria) {
          case "alpha-asc":
            break;
          case "alpha-dsc":
            break;
          case "price-asc":
            break;
          case "price-dsc":
            break;
          default:
            break;
        }
    }

    else if(req.params.category){
      var category = req.params.category;
      console.log(category);
      Product.find({'category':category}, function(err, product){
        if (err) throw err;
        res.json(product);
      });
    }else{

      Product.find({}, function(err, product) {
        if (err) throw err;
  
  
        res.json(product);
      });

    }


  });

  // save product - /api/products
  router.post("/", function(req, res) {
    var body = req.body;
    var product = new Product();
    product.id = body.id;
    product.name = body.name;
    product.price = body.price;
    product.image = body.image;
    product.category = body.category;
    product.description = body.description;
    body.features.forEach(function(feature) {
       product.features.push(feature);
    });

    product.save((err, product)=>{
      if (err){
        return res.status(400).json({
          title: 'An error has occured !',
          error : err
        });
      }
      res.status(201).json({
        title : 'Product Saved.'
      });
    });

  });

  // delete specific product - /api/products/:id
  router.delete('/:id', function (req, res) { 
    Product.remove({id: req.params.id}, 
      function (err, product) {
        if (err){
          return res.status(404).json({
            title: 'An error has occured !',
            error : err
          });
        }
        res.status(204).json({
          title : 'Product Deleted.'
        });
    });
});

  // Delete all products /api/products
  router.delete('/', function (req, res) { 
    Product.remove({}, 
      function (err, product) {
        if (err){
          return res.status(404).json({
            title: 'An error has occured !',
            error : err
          });
        }
        res.status(204).json({
          title : 'Products Deleted'
        });
    });
  });





module.exports = router;