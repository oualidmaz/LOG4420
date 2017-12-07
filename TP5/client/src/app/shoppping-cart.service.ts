import { ICartItem, OnShoppingCartUpdated } from './shoppping-cart.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from 'app/config';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ProductsService } from 'app/products.service';
import { DataService } from 'app/data.service';


@Injectable()
export class ShopppingCartService extends DataService {
  private cart: Array<ICartItem>= [];
  private itemsCount: number;

  private cartWatchers:Array<OnShoppingCartUpdated> =[];

  constructor(http:Http, private productService?:ProductsService) { 
    super(http);
    this.baseUrl = `${Config.apiUrl}/shopping-cart`;
  }
  subscribe(w :OnShoppingCartUpdated){
    this.cartWatchers.push(w);
  }
  unSubscribe(w :OnShoppingCartUpdated){
    this.cartWatchers.splice(this.cartWatchers.indexOf(w),1);
  }
  notifyWatchers():void {
    this.cartWatchers.forEach(cw => cw.onCartUpdated());
  }
  items():Observable<Array<ICartItem>> {
     
      return super.get()
                 .map(items => {
                   this.cart = items;
                   console.log(items);
                   return items as Array<ICartItem>
                  });
  }
  itemCount():Observable<number> {

    return this.items()
               .map(items=>{
                 let sum = 0;
                 items.forEach(item => sum += item.quantity);
                 return sum;
               });
  }
  getItem(item:number):Observable<ICartItem> {
    return this.get(item.toString()).map(item => item as ICartItem);
}

  products(){
      return this.items().map(items=>{
        let products = [];

        items.forEach(item => {
          this.productService.getProduct(item.productId)
          .then(p=>{
            (p as any).quantity = item.quantity;
             products.push(p);
          });
        });

        return products;
      });
  }
  addItem(item:ICartItem):void{
    
    let cartItem = this.cart.find(c => c.productId == item.productId);
    if(cartItem){
        cartItem.quantity += item.quantity;
        this.updateQuantity(cartItem);
        console.log(cartItem);
        return;
    }


    this.cart.push(item);
    this.post(null,item).subscribe(ok =>{
      this.notifyWatchers();
      
    },err=>{
      console.log(err);
      this.removeFromCart(item.productId);
    });
  }
  private removeFromCart(item:number) {
    let id = this.cart.findIndex(i => i.productId == item);
    console.log("id =", id);
    this.cart.splice(id, 1);
    
    this.notifyWatchers();
  }

  removeItem(item:number){

    return this.delete("/"+item.toString())
               .subscribe(ok =>this.removeFromCart(item));
  }
  clear(){
    return this.delete().subscribe(()=> {
      this.cart = [];
      this.notifyWatchers();
    });
  }
  updateQuantity(item:ICartItem){

    let cartItem = this.cart.find(c => c.productId == item.productId);
    let previousQty = cartItem.quantity;
    cartItem.quantity = item.quantity;

    return this.put(`/${item.productId}`,{quantity:item.quantity})
               .subscribe(
                 () => this.notifyWatchers()
                ,err =>{
                  cartItem.quantity = previousQty;
                });
  }

  get count():number {
    let sum = 0;
    this.cart.forEach(item => sum += item.quantity);
    return sum;
  }
 
}

export interface ICartItem{
  productId:number,
  quantity:number
}
export interface OnShoppingCartUpdated {
  onCartUpdated();
}