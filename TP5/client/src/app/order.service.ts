import { Product } from './products.service';
import { OrderComponent } from './order/order.component';
import { Config } from 'app/config';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/data.service';

@Injectable()
export class OrderService extends DataService {
  currentOrderNumber: any;
  private _orders :Array<Order> = [];

  constructor(http:Http) { 
    super(http);
    this.baseUrl = `${Config.apiUrl}/orders`;
  }
  add(order:Order){
    return this.post(null,order).map(() =>{ 
      console.log("oderrrrrrrrrrrrrrrr");
      this.currentOrderNumber = Order.Orders++;
      this.orders.push(order);
    });
  }
  get nextOrderId():number{
    return Order.Orders +1;
  }
  get orderNumber(){
    return this.currentOrderNumber;
  }

  get orders(){
    return this._orders;
  }

}

export class Order{
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  phone:string;
  products:Array<Product>;

  orderNumber:number;
  static Orders:number = 0;
}
