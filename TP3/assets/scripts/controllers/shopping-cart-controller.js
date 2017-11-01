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

          // console.log(Tp3.service.shoppingCart.itemIds);
          // console.log(Tp3.service.shoppingCart.itemPrices);

          Tp3.service.shoppingCart.itemIds.sort((a, b) => {
            let item1 = Tp3.service.shoppingCart.itemPrices.filter(item => item.id == a)[0];
            let item2 = Tp3.service.shoppingCart.itemPrices.find(item => item.id == b);

            console.log(`item1 = ${item1}, item2 =${item2}`);

            return item1.name.localeCompare(item2.name);
          });


          Tp3.service.shoppingCart.itemIds.forEach(function (id) {

            var product = products.filter(t => t.id == id)[0];


            let key = `${product.name.toLocaleUpperCase()}`;
            if(!vm.items.hasOwnProperty(key)){

              //if(products.length > 0)
              {
                vm.items[key] = {
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
              vm.items[key].count++;
            }
          });

          updateTable(vm.items);
        }

        function getTemplateRow(prod) {
          return ` <tr data-product-id="${prod.id}">
                <td><button class="remove-item-button"><i class="fa fa-times" aria-hidden="true"></i></button></td>
                <td><a href="./product.html?id=${prod.id}">${prod.product}</a></td>
                <td>${prod.unitPrice}&thinsp;$</td>
                <td>
                    <button class="circle-btn remove-quantity-button"  ${prod.count == 1? "disabled":""}><i class="fa fa-minus" aria-hidden="true"></i></button>
                    <span class="quantity">${prod.count}</span>
                    <button class="add-quantity-button"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </td>
                <td class="price">${prod.totalPrice().toFixed(2)}&thinsp;$</td>
              </tr>`;
        }

        var updateTable= function(items) {

          $("#total-amount").text(`${Tp3.service.shoppingCart.totalPrice().toFixed(2)} $`);

          var table = $(".table>tbody")[0];
          $(table).empty();

          for(let prop in items){
            $(table).append(getTemplateRow(items[prop]));

          }

          $(".add-quantity-button,.remove-quantity-button").click(function () {

            let id = $(this).parents("tr").data("product-id");


            if($(this).hasClass("add-quantity-button"))
              Tp3.service.shoppingCart.add(id);

            if($(this).hasClass("remove-quantity-button"))
              Tp3.service.shoppingCart.remove(id);

              updateCart();
           });
          $(".remove-item-button").click(function () {

            Tp3.service.shoppingCart
              .remove($(this).parents("tr").data("product-id"),true);
              updateCart();

          });

          if(Tp3.service.shoppingCart.itemIds.length === 0){

            $(".table-part").addClass("hide");
            $(".cart-content").removeClass("hide");
          }
          else{
            $(".cart-content").addClass("hide");
            $(".table-part").removeClass("hide");
          }

        };

       $("#remove-all-items-button").click(function () {

           Tp3.service.shoppingCart.clear();
           updateCart();


       });

    });
})();
