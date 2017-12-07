import { ShopppingCartService } from './../shoppping-cart.service';
import { Router } from '@angular/router';
import { OrderService, Order } from './../order.service';
import { Component, OnInit } from '@angular/core';
declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  products: any[];

  orderForm: any;
  
  /**
   *
   */
  constructor(private orderService:OrderService, 
              private router: Router, 
              private shoppingCart:ShopppingCartService) {

    shoppingCart.products().subscribe(products => this.products = products);
  }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });
  }

  /**
   * Submits the order form.
   */
  submit(form) {
    if (!this.orderForm.valid()) {
      return;
    }
    // TODO: Compléter la soumission des informations lorsque le formulaire soumis est valide.
    console.log(form);
    
    let value = form.value;

    let order = new Order();
    order.id =new Date().getTime();// this.orderService.nextOrderId;
    order.firstName = value['first-name'];
    order.email = value['email'];
    order.lastName = value['last-name'];
    order.phone = value['phone'];
    order.products = this.products;

    console.log(order);

    this.orderService.add(order).subscribe(ok =>{

      this.shoppingCart.clear();
      this.router.navigate(['/confirmation']);
    });
  }
}
