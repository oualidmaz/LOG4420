$(function(){
  "use strict"

  let order = app.order;
  let message ="";
  //if(order && !order.invalid)  {

    let padZero = Math.max(0,5-order.number.toString().length);
    message =`
    <h1>Votre commande est confirmée <span id="name">${order.name} ${order.lastName}</span>!</h1>
    <br>
    <p>Votre numéro de confirmation est le <strong>${"".padStart(padZero,"0")}<span id="confirmation-number">${order.number}</span></strong>.</p>`;

  //}
  // else if (order && order.invalid){
  //   message =`
  //   <h1>Votre commande n'a pas ete confirmée ${order.name} ${order.lastName}!</h1>
  //   <br>`;
  // }
  // else{
  //   $("article").html("");
  // }

  $("article").html(message);

  app.commit();

})
