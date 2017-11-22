var express = require("express");
var router = express.Router();
var Order = require('../models/orderModel');
var Product = require('../models/productModel');

router.get("/", function (req, res) {
  Order.find({}, function (err, orders) {
      if (err) {
        return res.status(400).json({
          title: 'An error has occured !',
          error: err
        });
      }
      res.status(200).json(orders);
    });
});

router.get("/:id", function (req, res) {
  Order.findOne({id: req.params.id}, function (err, order) {
    if (err || !order) {
      return res.status(404).json({
        title: 'Order ID not found !',
      });
    }
    res.status(200).json(order);
  });
});

router.post("/", function(req, res) {
  var body = req.body;
  console.log(body);
  var order = new Order();
  order.id = body.id;
  order.firstName = body.firstName;
  order.lastName = body.lastName;
  order.email = body.email;
  order.phone = body.phone;
  body.products.forEach(function(product) {
      order.products.push(product);

  });

  ["id","firstName","lastName","email","phone","products"].forEach(prop=>{
    //if(order.hasOwnProperty(prop)){
    console.log(prop);
      if(!order[prop]) return res.status(400).json({
        title:`La valeur de ${prop} est invalide!`
      })
    //}

  });

  let ids = order.products.map(p=> p.id);
  Product.find({id:{$in:ids}},(err,result)=>{
    if(result)
    if(result.length < ids.length)
      return res.status(400).json();

    order.save((err, order)=>{
      if (err){
        console.log(err);
        return res.status(400).json({
          title: 'An error has occured !',
          error : err
        });
      }

      res.status(201).json({
        title : 'Order Saved.',
        order:{
          id:body.id,
          name:body.name
        }
      });
    });
  });


  });

  // delete specific order - /api/orders/:id
  router.delete('/:id', function (req, res) {
    Order.remove({id: req.params.id},
      function (err, order) {
        if (err){
          return res.status(404).json({
            title: 'An error has occured !',
            error : err
          });
        }
        res.status(204).json({
          title : 'Order Deleted.'

        });
    });
});

  // Delete all orders /api/orders
  router.delete('/', function (req, res) {
    Order.remove({},
      function (err, order) {
        if (err){
          return res.status(404).json({
            title: 'An error has occured !',
            error : err
          });
        }
        res.status(204).json({
          title : 'Orders Deleted'
        });
    });
  });


module.exports = router;
