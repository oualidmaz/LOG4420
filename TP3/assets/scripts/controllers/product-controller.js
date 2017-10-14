(function(){

  $(function () {
    $("#product-quantity").attr("data-product-id",parseInt(localStorage.getItem("selected-product")));
    $("#prod-form").submit((evt) => {
      evt.preventDefault();
      let input =$("#product-quantity");
      Tp3.service.shoppingCart.add(input.data("product-id"), input.val());
      return false;
    });
  });

})();
