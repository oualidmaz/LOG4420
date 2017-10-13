(function(ns){
  "use strict"

  function service(){
    // Recupere tous les id des items
    this.getItemIds= function(){

      return new Promise(resolve => {
        $.get("/data/products.json", function (data) {
          resolve(data) ;
        });
      })
     };
    this.shoppingCart = {
      itemIds:[],
      add:function(id){
        console.log(this);
        this.itemIds.push(id);
        this.save();
      },
      remove:function (id,all) {
        if(all === true){

            let j = this.itemIds.indexOf(id);
            while(j > -1){
              this.itemIds.splice(this.itemIds.indexOf(id),1);
              j = this.itemIds.indexOf(id);
            }


        }
        else{
          this.itemIds.splice(this.itemIds.indexOf(id),1);
        }

        console.log(this.itemIds);
        this.save();
      },
      clear:function () {
        this.itemIds = [];
      },
      save:function(){
        localStorage.setItem("shopping-cart",JSON.stringify(this.itemIds)) ;
      }
    }
    this.shoppingCart.itemIds = JSON.parse(localStorage.getItem("shopping-cart"))||[];
    return this;
  };

  if(!ns.service){
    ns.service = new service();
  }
  console.log(ns.service.shoppingCart);


})(window.Tp3 = window.Tp3 || {});
