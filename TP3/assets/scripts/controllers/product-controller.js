(function () {

  $(function () {
    $("#product-quantity").attr("data-product-id", parseInt(localStorage.getItem("selected-product")));
    $("#prod-form").submit((evt) => {
      evt.preventDefault();
      let input = $("#product-quantity");
      Tp3.service.shoppingCart.add(input.data("product-id"), input.val());
      return false;
    });
    // hide shopping cart if there is no item on it
    // var nbrItemOnShoppingCart = JSON.parse(localStorage.getItem("shopping-cart")).length;
    // $('.shopping-cart .count').html(nbrItemOnShoppingCart);
    // if(nbrItemOnShoppingCart === 0){
    //   $('.shopping-cart .count').hide();
    // }else{
    //   $('.shopping-cart .count').show();
    // }

    $.urlParam = function (name) {
      var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
      if (results == null) {
        return null;
      } else {
        return results[1] || 0;
      }
    }

    var productId = $.urlParam('id');
    listProduct(productId);

    function listProduct(productId) {
      var products = [];
      var product = {};
      Tp3.service.getItemIds().then(items => {
        products = items;
        product = products.filter(function (i) {
          return i.id == productId;
        })[0];
        if(product){
          $('article > h1').html(product.name);
          $('.col:first').html(`
          <img alt="${product.name}" src="./assets/img/${product.image}" class="col img-responsive">
         `);
          $('.col:eq(2) section:eq(0)').empty();
          $('.col:eq(2) > section:eq(0)').html(`
              <h2>Description</h2>
              <p>${product.description}</p>
          `);
          $('.col:eq(2) section:eq(1) ul').empty();
          $.each(product.features, function (index, feature) {
            $('.col:eq(2) section:eq(1) ul').append(`<li>${feature}</li>`);
          });
        }else{ // product not found 
          $('article').empty().append('<h1>Page non trouvée !</h1>');
        }
       
      });

    }

    // add to cart 
    $('.add-to-cart').click(function (){
      
      //show notification for 5 seconds
      $('#dialog').fadeIn("slow").delay(5000).fadeOut();
    });



  });

})();
