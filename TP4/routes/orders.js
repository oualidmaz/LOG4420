var express = require("express");
var router = express.Router();
var Order = require('../models/orderModel');

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
  var order = new Order();
  order.id = body.id;
  order.firstName = body.firstName;
  order.lastName = body.lastName;
  order.email = body.email;
  order.phone = body.phone;
  body.products.forEach(function(product) {
      order.products.push(product);

  });

  order.save((err, order)=>{
    if (err){
      return res.status(400).json({
        title: 'An error has occured !',
        error : err
      });
    }
    res.status(201).json({
      title : 'Order Saved.'
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
