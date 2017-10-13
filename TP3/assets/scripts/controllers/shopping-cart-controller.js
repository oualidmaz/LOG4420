(function(){
  "use strict";

  $(function(){

    this.items = {};
    var vm = this;
    var products =[];


    Tp3.service.getItemIds().then(items => {
      products = items;
      updateCart();

    });

    function updateCart() {
      vm.items ={};

      Tp3.service.shoppingCart.itemIds.forEach(function (id) {
        if(!vm.items.hasOwnProperty(id.toString())){

          console.log(id);
          var product = products.filter(t => t.id === id)[0];
          console.log(product);
          //if(products.length > 0)
          {
            vm.items[id.toString()] = {
              id:product.id,
              count:1,
              product:product.name,
              unitPrice:product.price,
              totalPrice:function () {
                return this.unitPrice * this.count;
              }
            }
          }

        }
        else{
          vm.items[id.toString()].count++;
        }
      });
      updateTable(vm.items);
    }

    function getTemplateRow(prod) {
      return ` <tr>
            <td><button class="btn-remove"><i class="fa fa-times" aria-hidden="true"></i></button></td>
            <td><a href="./product.html">${prod.product}</a></td>
            <td>${prod.unitPrice}&thinsp;$</td>
            <td>
                <button class="circle-btn btn-minus" data-product-id="${prod.id}"><i class="fa fa-minus" aria-hidden="true"></i></button>
                <span>${prod.count}</span>
                <button class="btn-plus" data-product-id="${prod.id}"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </td>
            <td>${prod.totalPrice().toFixed(2)}&thinsp;$</td>
          </tr>`;
    }

    var updateTable= function(items) {
      var table = $(".table>tbody")[0];
      $(table).empty();
      for(let prop in items){

        let id =items[prop].id;
        console.log(items[prop]);
        $(table).append(getTemplateRow(items[prop]));
        $(".btn-minus").click(function () {
          if($(this).data("product-id") === id){
          Tp3.service.shoppingCart.remove(id);
          updateCart();
          }
        });

        $(".btn-plus").click(function () {
          if($(this).data("product-id") === id){
            Tp3.service.shoppingCart.add(id);
            updateCart();
          }

        });
        $(".btn-remove").click(function () {
          Tp3.service.shoppingCart.remove(id,true);
          updateCart();
        });
      }
      // items.forEach(item =>{
      //   $(vm.shoppingTable).find("body").append(getTemplateRow(item))
      // });
    };






  });



})();
