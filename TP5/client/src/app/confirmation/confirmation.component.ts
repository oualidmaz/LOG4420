import { OrderService,Order } from './../order.service';
import { Component } from '@angular/core';

/**
* Defines the component responsible to manage the confirmation page.
*/
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {
  _order: Order;
  constructor(private orders:OrderService){
    console.log(this.orders.orders);
    if(this.orders.orders.length >0){
      let id =this.orders.orders.length -1;
      this._order = this.orders.orders[id];
      this._order.orderNumber = id +1;
    }
      
  }
  get order(){
    return this._order;
  }

}
