(function (app) {

      $(function () {

       // hide shopping cart if there is no item on it
        app.shoppingCart = Tp3.service.shoppingCart;
        console.log(app.shoppingCart);
        app.order = JSON.parse(localStorage.getItem("order"));


        var updateCart = nbItems =>{


         $('.shopping-cart .count').html(nbItems);
         if(nbItems === 0){
           $('.shopping-cart .count').hide();
         }else{
           $('.shopping-cart .count').show();
         }
       };

        app.addOrder = order =>{
          if(app.shoppingCart.count()){
            order.number = parseInt(localStorage.getItem("command-number")||1)
            localStorage.setItem("order",JSON.stringify(order));
            localStorage.setItem("command-number",order.number + 1);
          }
          else{
            order.invalid = true;
          }
        };

        app.commit = ()=>{
          localStorage.removeItem("order");
          localStorage.removeItem("shopping-cart");
          app.shoppingCart.clear();
        }

       app.shoppingCart.addObserver(updateCart);

       updateCart(app.shoppingCart.count() || 0);


      });

})(app = window.app || {});
