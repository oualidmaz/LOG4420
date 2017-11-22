var express = require("express");
var router = express.Router();
var Product = require('../models/productModel');


// get prudcts - /api/products
router.get("/", function (req, res) {
  var criteria;
  if (req.query.criteria) {
     criteria = sorting.find(s => s.name == req.query.criteria);
    if (criteria) {
      criteria = criteria.fn;
    } else {
      return res.status(400).json({ title: 'Invalide criteria !' });
    }
  }else{
    criteria = sortByPriceASC;
  }
  if (req.query.category) {
    var category = categorys.includes(req.query.category) ? req.query.category : null;
    if (!category) {
      return res.status(400).json({ title: 'Invalide category !' });
    }
    Product.find({ 'category': category }, function (err, products) {
      if (err) {
        return res.status(400).json({
          title: 'An error has occured !',
          error: err
        });
      }
      products = products.sort(criteria);
      res.status(200).json(products);
    });
  } else {
    Product.find({}, function (err, products) {
      if (err) {
        return res.status(400).json({
          title: 'An error has occured !',
          error: err
        });
      }
      products = products.sort(criteria);
      res.status(200).json(products);
    });
  }

});

router.get("/:id", function (req, res) {
  Product.findOne({id: req.params.id}, function (err, product) {
    if (err || !product) {
      return res.status(404).json({
        title: 'product ID not found!',
      });
    }
    res.status(200).json(product);
  });
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

    if(product.features.length < 1 || product.features[0] == ""){
      return res.status(400).json({title: 'Features should not be empty !'});
    }
    if(!Number.isInteger(product.id)){
      return res.status(400).json({title: 'Invalide product ID'});
    }
    if(!product.name){
      return res.status(400).json({title: 'Invalid product name!'});
    }
    if(!product.price){
      return res.status(400).json({title: 'Invalid price!'});
    }
    if(!product.image){
      return res.status(400).json({title: 'Invalid image!'});
    }
    if(!product.description){
      return res.status(400).json({title: 'Invalid description!'});
    }
    if(!categorys.includes(product.category)){
      return res.status(400).json({title: 'Invalid category!'});
    }

    // ["id","name","price","image","category","description"].forEach(prop=>{
    //   if(!product[prop]){
    //     return res.status(400).json({
    //     title:`La valeur de ${prop} est invalide!`
    //   })
    //   } 

    // });

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
    Product.findOne({id:req.params.id},function(err,product){
      if (err|| !product){
        return res.status(404).json({
          title: 'An error has occured !',
          error : err
        });
      }
      Product.remove(product,
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
    })

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


function sortByPriceASC(a, b) {
  return a.price - b.price;
}

function sortByPriceDESC(a, b) {
  return b.price - a.price;
}

function sortByNameASC(a, b) {
  var nameA = a["name"].toLowerCase();
  var nameB = b["name"].toLowerCase();
  if (nameA > nameB) {
    return 1;
  } else if (nameA < nameB) {
    return -1;
  }
  return 0;
}
function sortByNameDESC(a, b) {
  var nameA = a["name"].toLowerCase();
  var nameB = b["name"].toLowerCase();
  if (nameA > nameB) {
    return -1;
  } else if (nameA < nameB) {
    return 1;
  }
  return 0;
}

var sorting = [{name:'alpha-asc',fn:sortByNameASC}, {name:'alpha-dsc',fn:sortByNameDESC},
               {name:'price-asc',fn:sortByPriceASC}, {name:'price-dsc',fn:sortByPriceDESC}];

var categorys = ['cameras','computers','consoles','screens'];

module.exports = router;

