var express = require("express");
var router = express.Router();
var Product = require('../models/productModel');

router.get("/", function(req, res) {
    res.status(200).json(req.session.shoppingCart||(req.session.shoppingCart=[]));
  })
  .get("/:id",function(req,res){
    req.session.shoppingCart =req.session.shoppingCart ||[];
    let product =req.session.shoppingCart.filter(p => p.productId == req.params.id);
    if(product.length > 0)
        res.status(200).json( product[0]);
    else{
      res.status(404).json({
        title: 'product ID not found!',
      });
    }

  })
  .post("/",function(req,res){

    req.session.shoppingCart = req.session.shoppingCart||[];
    if(!parseInt(req.body.quantity) )
      return res.status(400).json({
        title: 'la quantité spécifiée est invalide',
      });
    if(req.session.shoppingCart.some(p=> p.productId == req.body.productId))
      return res.status(400).json({
        title: 'le produit ' +
        'associé à l’identifiant spécifié a déjà été ajouté dans le panier',
      });
    Product.findOne({id: req.body.productId}, function (err, product) {
      if (err || !product) {
        return res.status(400).json({
          title: 'product ID not found!',
        });
      }

      var item = {productId:req.body.productId,quantity: req.body.quantity};
      req.session.shoppingCart.push(item);
      res.status(201).json(item);
    });
  })
  .put("/:id",function(req,res){
    if(!parseInt(req.body.quantity))
      return res.status(400).json({
        title: 'la quantité spécifiée est invalide',
      });
    req.session.shoppingCart = req.session.shoppingCart||[];
    if(!req.session.shoppingCart.some(p=> p.productId == req.params.id))
      return res.status(404).json({
        title: 'l’identifiant spécifié n’existe pas dans le panier',
      });

    Product.findOne({id: req.params.id}, function (err, product) {
      if (err || !product) {
        return res.status(404).json({
          title: 'product ID not found!',
        });
      }
      var item = req.session.shoppingCart.filter(p => p.productId == req.params.id)[0];
      item.quantity = req.body.quantity;

      res.status(204).json();
    });
  })
  .delete("/:id",function(req,res){
    req.session.shoppingCart = req.session.shoppingCart||[];

    let items = req.session.shoppingCart.filter(p => p.productId == req.params.id);


    if(items.length == 0)
      return res.status(404).json({
      title: 'product ID not found!',
    });

    let index = req.session.shoppingCart.indexOf(items[0]);
    req.session.shoppingCart.splice(index,1);

    return res.status(204).json();

  })
  .delete("/",function(req,res){
    req.session.shoppingCart =[];
      return res.status(204).json();
  });

module.exports = router;
