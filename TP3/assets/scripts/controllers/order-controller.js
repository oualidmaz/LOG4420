$(function(){


  $("#order-form").validate({
    rules:{
      "first-name":{
        required:true,
        minlength:2
      },
      "last-name":{
        required:true,
        minlength:2
      },
      email:{
        required:true,
        email:true
      },
      phone:{
        required:true,
        phoneUS:true
      },
      "credit-card":{
        required:true,
        creditcard:true,
      },
      "credit-card-expiry":{
        required:true,
        creditcardexpiry:true
      }

    },
    messages:{
      minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),

    }

  });
  jQuery.validator.addMethod("creditcardexpiry", function(value, element) {
    return this.optional(element) || /^((0[1-9])|(1[0-2]))\/([0-9]{2})$/.test(value);
  }, "La date d'expiration de votre carte de crédit est invalide.");

  $("#order-form").submit(function (evt) {

    if($(this).valid()){
      app.addOrder({
        name :$("#first-name").val(),
        lastName:$("#last-name").val(),
      });
    }

  })

})
