var onlineShop = onlineShop || {};

/**
 * Defines a service to manage the orders.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.ordersService = (function() {
  "use strict";

  var self = {};
  var orders = [];

  /**
   * Creates a new order.
   *
   * @param order   The order to create.
   */
  self.createOrder = function(order) {


    if (order) {
      order.id = orders.length + 1;
      orders.push(order);

      $.ajax({
        url: `/api/orders/`,
        type: 'POST',
        success: function (res) {
          console.log(res);
          _updateLocalStorage();
        },
        data: JSON.stringify(order),
        contentType: "application/json"
      });
    }
  };

  /**
   * Gets the order based on the specified ID.
   *
   * @param orderId   The ID of the order.
   * @returns {*}     The order associated with the specified ID.
   */
  self.getOrder = function(orderId) {
    if (orderId <= 0 || orderId > orders.length) {
      throw new Error("Invalid order ID specified.")
    }
    return orders[orderId - 1];
  };
  self.getOrderAsync = function(orderId) {
    return new Promise((resolve,reject)=>{
      if (orderId > 0 && orderId <= orders.length) {
        resolve( orders[orderId - 1]);
        throw new Error("Invalid order ID specified.")
      }
      $.get("/api/orders").done(data=>{
        orders = data;
        if (orderId <= 0 || orderId > orders.length) {
          reject( new Error("Invalid order ID specified."));
        }
        resolve( orders[orderId - 1]);
      });

    })

  };
  /**
   * Gets the orders count.
   *
   * @returns {Number}  The orders count.
   */
  self.getOrdersCount = function() {
    return orders.length;
  };
  self.getOrdersCountAsync = function() {
    return new Promise((resolve,_)=>{
      $.get("/api/orders").done(data=>{
        orders = data;
        resolve( orders.length);
      });
    });
  };
  /**
   * Updates the orders list in the local storage.
   *
   * @private
   */
  function _updateLocalStorage() {

    $.get("/api/orders").done(data=>{
      orders = data;
      console.log(orders);
    });
  }

  // Initializes the orders list.
  // $.get("/api/shopping-cart").then(shoppingCart=>{
  //   orders = shoppingCart;
  // },err =>{
  //   console.loh
  // })
  // if (localStorage["orders"]) {
  //   orders = JSON.parse(localStorage["orders"]);
  // }

  _updateLocalStorage();
  return self;
})();
