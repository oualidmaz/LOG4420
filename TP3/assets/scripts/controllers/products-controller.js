(function(){
  "use strict";

  //Just for test purpose

  $(function () {
    var items =[];
    Tp3.service.getItemIds().then((data)=>{
      items = data;
      items.sort(function (a,b){
        if (a.price < b.price)
           return -1;
        if (a.price> b.price)
           return 1;
        return 0;
    });

      listProduct(items);
    });

    function listProduct(products){
      $('#products-list').html('');
      $.each(products, function(index, item) {
        $('#products-list').append(`
        <a href="./product.html" title="En savoir plus...">
          <h2>${item.name}</h2>
          <img alt="${item.name}" src="./assets/img/${item.image}">
          <p><small>Prix</small> ${item.price}&thinsp;$</p>
        </a>
        `);
     });
    }

    $("#product-categories > button").click((evt) => {
      $(event.target).addClass("selected").siblings().removeClass('selected');
      var selectedCategory = event.target.getAttribute('name');
      var filtredProducts = items.filter(function(i){
        if(selectedCategory == "all"){
          return true;
        }else{
          return (i.category == selectedCategory);
        }   
      });
      listProduct(filtredProducts);
    });

    $("#products-list a>img").click((evt) => {
      let a =$(evt.target);
      let h2 =$(a).prev("h2");
      localStorage.setItem("selected-product",items.filter(item => item.name === $(h2[0]).text())[0].id );

    });
  });
})();
