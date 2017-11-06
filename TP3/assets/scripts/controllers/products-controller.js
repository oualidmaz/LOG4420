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
      updateNbrProducts(items);
    });

    function listProduct(products){
      $('#products-list').html('');
      $.each(products, function(index, item) {
        $('#products-list').append(`
        <a href="./product.html?id=${item.id}" title="En savoir plus..." data-product-id="${item.id}">
          <h2>${item.name}</h2>
          <img alt="${item.name}" src="./assets/img/${item.image}">
          <p><small>Prix</small> ${item.price.toFixed(2).replace(".",",")}$</p>
        </a>
        `);
     });


      // $("#products-list a").click((evt) => {
      //   localStorage
      //     .setItem("selected-product",$(evt.target).parent("a").data("product-id"));
      //
      // });
    }

    function sortByPriceASC(a,b){
       return a.price - b.price;
    }

    function sortByPriceDESC(a,b){
       return b.price - a.price;
    }

    function sortByNameASC(a,b){
      return a.name.localeCompare(b.name);// a.name == b.name ? 0 : a.name < b.name ? -1 : 1;
    }
    function sortByNameDESC(a,b){
      return -a.name.localeCompare(b.name);// a.name == b.name ? 0 : b.name < a.name ? -1 : 1;
    }

    function orderProducts(category, sorting){
      var sortedProducts = [];
      var filtredProducts = items.filter(function(i){
        if(category == "all"){
          return true;
        }else{
          return (i.category == category);
        }
      });

     console.log(sorting);
     if(sorting === "price-up")
       sortedProducts = filtredProducts.sort(sortByPriceASC);
     if(sorting === "price-down")
       sortedProducts = filtredProducts.sort(sortByPriceDESC);
     if(sorting === "alpha-up")
       sortedProducts = filtredProducts.sort(sortByNameASC);
     if(sorting === "alpha-down")
       sortedProducts = filtredProducts.sort(sortByNameDESC);


     console.log(sortedProducts);
     return sortedProducts;

    }

    function updateNbrProducts(products){
      $("#products-count").html(`${products.length} produit${products.length?"s":""}`);
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

      updateNbrProducts(filtredProducts);

      listProduct(filtredProducts);
    });

    $("#product-criteria > button").click((evt) => {
      $(event.target).addClass("selected").siblings().removeClass('selected');
      var selectedSorting = event.target.getAttribute('name');
      var selectedCategory = $( "#product-categories .selected" ).attr("name");
      var sortedProducts = orderProducts(selectedCategory,selectedSorting);
      listProduct(sortedProducts);
    });


  });
})();
