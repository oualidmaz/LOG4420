var onlineShop = onlineShop || {};

/**
 * Controls the "confirmation" view.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
(function($, ordersService, utils) {
  "use strict";
  ordersService.getOrdersCountAsync().then(count =>{
    ordersService.getOrderAsync(count).then(order=>{
      $("#name").text(order.firstName + " " + order.lastName);
      $("#confirmation-number").text(utils.pad(order.id, 5));
    });
  });


})(jQuery, onlineShop.ordersService, onlineShop.utils);
