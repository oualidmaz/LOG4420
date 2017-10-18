(function(){

  $(function () {
    $("#product-quantity").attr("data-product-id",parseInt(localStorage.getItem("selected-product")));
    $("#prod-form").submit((evt) => {
      evt.preventDefault();
      let input =$("#product-quantity");
      Tp3.service.shoppingCart.add(input.data("product-id"), input.val());
      return false;
    });
    // hide shopping cart if there is no item on it
    var nbrItemOnShoppingCart = JSON.parse(localStorage.getItem("shopping-cart")).length;
    $('.shopping-cart .count').html(nbrItemOnShoppingCart);
    if(nbrItemOnShoppingCart === 0){
      $('.shopping-cart .count').hide();
    }else{
      $('.shopping-cart .count').show();
    }
  });

})();
