var onlineShop = onlineShop || {};

/**
 * Defines a service to manage the shopping cart.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.shoppingCartService = (function($, productsService) {
  "use strict";

  var self = {};
  var items = {};

  /**
   * Adds an item in the shopping cart.
   *
   * @param productId   The ID associated with the product to add.
   * @param [quantity]  The quantity of the product.
   */
  self.addItem = function(productId, quantity) {
    if (productId === undefined) {
      throw new Error("The specified product ID is invalid.")
    }
    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      quantity = 1;
    }
    if (items[productId]) {
      items[productId] += quantity;
      self.updateItemQuantity(productId,items[productId] + quantity);

    } else {
      items[productId] = quantity;
      $.post("/api/shopping-cart/",{productId,quantity}).then(res =>{
        console.log(res);
        _updateLocalStorage();
      },err=>{
        console.log(err);
      });
    }
  };

  /**
   * Gets the items in the shopping cart.
   *
   * @returns {jquery.promise}    A promise that contains the list of items in the shopping cart.
   */
  self.getItems = function() {
    return productsService.getProducts("alpha-asc").then(function(products) {
      return products.filter(function(product) {
        return items.hasOwnProperty(product.id) && items[product.id] !== undefined;
      }).map(function(product) {
        return {
          product: product,
          quantity: items[product.id],
          total: product.price * items[product.id]
        };
      });
    });
  };

  /**
   * Gets the items count in the shopping cart.
   *
   * @returns {number}  The items count.
   */
  self.getItemsCount = function() {
    var total = 0;
    for (var productId in items) {
      if (items.hasOwnProperty(productId) && items[productId]) {
        total += items[productId];
      }
    }
    return total;
  };
  self.getItemsCountAsync = function() {
    return new Promise((resolve,reject)=>{
      $.get("/api/shopping-cart").then(shoppingCart=>{
        items={};
        $.each(shoppingCart,(i,product)=>{
          items[parseInt(product.productId)] = parseInt(product.quantity);
        });
        if(self._onUpdate) self._onUpdate();
        resolve(self.getItemsCount());
      },err => reject(err));
    });

  };
  /**
   * Gets the quantity associated with an item.
   *
   * @param productId   The product ID associated with the item quantity to retrieve.
   * @returns {*}
   */
  self.getItemQuantity = function(productId) {
    return items[productId] || 0;
  };

  /**
   * Gets the total amount of the products in the shopping cart.
   *
   * @returns {jquery.promise}    A promise that contains the total amount.
   */
  self.getTotalAmount = function() {
    return self.getItems().then(function(items) {
      var total = 0;
      items.forEach(function(item) {
        if (item) {
          total += item.total;
        }
      });
      return total;
    });
  };

  /**
   * Updates the quantity associated with a specified item.
   *
   * @param productId   The product ID associated with the item to update.
   * @param quantity    The item quantity.
   */
  self.updateItemQuantity = function(productId, quantity) {
    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      throw new Error("The specified quantity is invalid.")
    }
    if (items[productId]) {
      items[productId] = quantity;
      $.ajax({
        url: `/api/shopping-cart/${productId}`,
        type: 'PUT',
        success: function (res) {
          console.log(res);
          _updateLocalStorage();
        },
        data: JSON.stringify({productId,quantity:items[productId]}),
        contentType: "application/json"
      });
    }
  };

  /**
   * Removes the specified item in the shopping cart.
   *
   * @param productId   The product ID associated with the item to remove.
   */
  self.removeItem = function(productId) {
    if (items[productId]) {
      $.ajax({
        url: `/api/shopping-cart/${productId}`,
        type: 'DELETE',
        success: function (res) {
          console.log(`delete =${res}`);
          _updateLocalStorage();
        },
        data: JSON.stringify({productId,quantity:items[productId]}),
        contentType: "application/json"
      });
      items[productId] = undefined;
    }
  };

  /**
   * Removes all the items in the shopping cart.
   */
  self.removeAllItems = function() {
    items = {};
    $.ajax({
      url: `/api/shopping-cart/`,
      type: 'DELETE',
      success: function (res) {
        console.log(`delete =${res}`);
        _updateLocalStorage();
      },
      contentType: "application/json"
    });
  };

  /**
   * Updates the shopping cart in the local storage.
   *
   * @private
   */
  function _updateLocalStorage() {
    //localStorage["shoppingCart"] = JSON.stringify(items);
    $.get("/api/shopping-cart").done(shoppingCart=>{
      console.log(shoppingCart);
      items={};
      $.each(shoppingCart,(i,product)=>{
        items[product.productId] = parseInt(product.quantity);
      });
      console.log(items);

      if(self._onUpdate) self._onUpdate();
    });
  }

  self.onUpdate= function(callback){
    this._onUpdate = callback;
  };
  // Initializes the shopping cart.
  // if (localStorage["shoppingCart"]) {
  //   items = JSON.parse(localStorage["shoppingCart"]);
  // }
  _updateLocalStorage();


  return self;
})(jQuery, onlineShop.productsService);
