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
      itemPrices:[],
      itemIds:[],
      add:function(id, count = 1) {
       for(let i = 0; i< count; ++i)
            this.itemIds.push(parseInt(id));
        this.save();

      },
      remove: function(productId,all) {
        let id = parseInt(productId);
        if(all === true){
          if(!confirm("Voulez-vous supprimer le produit du panier?")) return;
            let j;

            while( (j = this.itemIds.indexOf(id)) > -1){
              this.itemIds.splice(this.itemIds.indexOf(id),1);

            }
        }
        else{

          this.itemIds.splice(this.itemIds.indexOf(id),1);
        }
        this.save();
      },
      clear:function(prompt) {

        if(prompt && !confirm("Voulez-vous supprimer tous les produits du panier?")) return;

        this.itemIds = [];
        this.save();
      },
      save:function(){
        localStorage.setItem("shopping-cart",JSON.stringify(this.itemIds)) ;
        if(this.observer)
          this.observer(this.itemIds.length);
      },
      totalPrice: function() {
        let total = 0;
        console.log(this.itemIds);
        this.itemIds.forEach(id => total+= this.itemPrices.filter(item => item.id == id)[0].price);
        return total;

      },
      count:function () {
        return this.itemIds.length;
      },
      addObserver:function (observer) {
        this.observer = observer;
      }
    }
    this.shoppingCart.itemIds = JSON.parse(localStorage.getItem("shopping-cart"))||[];
    this.getItemIds().then( items => {
      this.shoppingCart.itemPrices = items.map(item => {return {id:item.id,name:item.name, price:item.price};});

    } );
    return this;
  };

  if(!ns.service){
    ns.service = new service();
  }

})(window.Tp3 = window.Tp3 || {});
