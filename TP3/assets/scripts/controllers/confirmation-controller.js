$(function(){
  "use strict"

  let order = app.order;
  let message ="";
  if(order && !order.invalid){

    let padZero = Math.max(0,6-order.number.toString().length);
    message =`
    <h1>Votre commande est confirmée ${order.name} ${order.lastName}!</h1>
    <br>
    <p>Votre numéro de confirmation est le <strong>${order.number.toString().padStart(padZero,"0")}</strong>.</p>`;

  }
  else if (order && order.invalid){
    message =`
    <h1>Votre commande n'a pas ete confirmée ${order.name} ${order.lastName}!</h1>
    <br>`;
  }
  else{
    $("article").html("");
  }

  $("article").html(message);

  app.commit();

})
