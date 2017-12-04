var express = require("express");
var router = express.Router();
var validator = require('validator');
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
    return res.status(200).json(orders);
  });
});

router.get("/:id", function (req, res) {
  Order.findOne({
    id: req.params.id
  }, function (err, order) {
    if (err || !order) {
      return res.status(404).json({
        title: 'Order ID not found !',
      });
    }
    return res.status(200).json(order);
  });
});

router.post("/", function (req, res) {
  var body = req.body;
  var order = new Order();
  order.id = body.id;
  order.firstName = body.firstName;
  order.lastName = body.lastName;
  order.email = body.email;
  order.phone = body.phone;
  body.products.forEach(function (product) {
    order.products.push(product);

  });

  if (!Number.isInteger(order.id)) {
    return res.status(400).json({
      title: 'Invalide order ID'
    });
  }
  if (!order.firstName) {
    return res.status(400).json({
      title: 'Invalid firstName!'
    });
  }
  if (!order.lastName) {
    return res.status(400).json({
      title: 'Invalid lastName !'
    });
  }
  if (!validator.isEmail(order.email)) {
    return res.status(400).json({
      title: 'Invalid email!'
    });
  }
  if (!isValidCellNumber(order.phone)) {
    return res.status(400).json({
      title: 'Invalid Phone number!'
    });
  }

  if (order.products.length < 1 || order.products[0] == "") {
    return res.status(400).json({
      title: 'products should not be empty !'
    });
  }

console.log(order);

  if(!order
      .products
      .every(product =>(Number.isInteger(parseInt(product.id))||Number.isInteger(parseInt(product.productId))) && Number.isInteger(parseInt(product.quantity))))
    return res.status(400).json({
            title: 'Invalid product id or quantity !'
          });

  let ids = order.products.map(p => p.id);
  Product.find({id: {$in: ids}}, (err, result) => {
    if (result)
      if (result.length < ids.length)
        return res.status(400).json();

    order.save((err, order) => {
      if (err) {
        return res.status(400).json({
          title: 'An error has occured !',
          error: err
        });
      }

      return res.status(201).json(
        {
        title: 'Order Saved.',
        order: {
          id: body.id,
          name: body.name
        }
      }
      );
    });
  });
});

router.delete('/:id', function (req, res) {
  Order.findOneAndRemove({
    id: req.params.id
  }, function (err, order) {
    if (err || !order) {
      return res.status(404).json({
        title: 'ID not found !',
      });
    }
    Order.remove(order,
      function (err, order) {
        if (err) {
          return res.status(404).json({
            title: 'An error has occured !',
            error: err
          });
        }
        return res.status(204).json({
          title: 'Order Deleted.'
        });
      });
  })
});

// Delete all orders /api/orders
router.delete('/', function (req, res) {
  Order.remove({},
    function (err, order) {
      if (err) {
        return res.status(404).json({
          title: 'An error has occured !',
          error: err
        });
      }
      return res.status(204).json({
        title: 'Orders Deleted'
      });
    });
});

function isValidCellNumber(phone) {
  var regexp = /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/;
  return regexp.test(phone);
}

module.exports = router;
