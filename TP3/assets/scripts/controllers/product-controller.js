(function(){

  $(function () {
    $("#product-quantity").attr("data-product-id",parseInt(localStorage.getItem("selected-product")));
    $("#prod-form").submit((evt) => {
      Tp3.service.shoppingCart.add($("#product-quantity").data("product-id"));
      return false;
    });
  });

})();
