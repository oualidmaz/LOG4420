(function(){
  "use strict";

  //Just for test purpose

  $(function () {
    var items =[];
    Tp3.service.getItemIds().then((data)=>{
      items = data;
    });
    $("#products-list a>img").click((evt) => {
      let a =$(evt.target);
      let h2 =$(a).prev("h2");
      localStorage.setItem("selected-product",items.filter(item => item.name === $(h2[0]).text())[0].id );

    });
  });
})();
