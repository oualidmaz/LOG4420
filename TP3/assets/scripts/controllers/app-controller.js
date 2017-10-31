(function () {
    
      $(function () {
        
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
    