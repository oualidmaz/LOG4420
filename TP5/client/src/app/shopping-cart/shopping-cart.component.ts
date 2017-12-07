import { OnShoppingCartUpdated } from './../shoppping-cart.service';
import { Component, OnInit } from '@angular/core';
import {ProductsService, Product} from "../products.service";
import { ShopppingCartService,ICartItem } from 'app/shoppping-cart.service';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit , OnShoppingCartUpdated {


  private cart:Array<ICartItem> =[];
  private products:Array<any> = [];

  constructor(private shoppingCart: ShopppingCartService, private productSerive:ProductsService){
      this.shoppingCart.subscribe(this);
  }
  ngOnInit(): void {
    this.shoppingCart.get()
                     .subscribe(items => {
                       this.cart = items;
                       this.loadProducts();
                      });
  }
  onCartUpdated() {
    if(this.shoppingCart.count == 0){
      this.cart = [];
      this.products =[];
    }
  }
  private loadProducts(){
    this.products = [];
    this.cart.forEach(item =>{
        this.productSerive.getProduct(item.productId)
        .then(p=>{
          (p as any).quantity = item.quantity;
          this.products.push(p);
          this.products.sort((p1,p2)=>  (p1.name as string).localeCompare(p2.name));
        });
    });
  }
  addQty(p:any){
    this.shoppingCart.updateQuantity({
      productId:p.id,
      quantity:++p.quantity
    });
  }
  removeQty(p:any){
    this.shoppingCart.updateQuantity({
      productId:p.id,
      quantity:--p.quantity
    });
  }
  removeProduct(p:any){
    if(!confirm("Voulez-vous supprimer le produit du panier?")) return;
    this.products.splice(this.products.indexOf(p),1);
    this.shoppingCart.removeItem(p.id);
  }
  clearCart(){
    if(!confirm("Voulez-vous supprimer tous les produits du panier?")) return;
    this.shoppingCart.clear();
  }
  get count(){
    return this.cart.length;
  }
  get cartTotal(){
    let sum = 0;
    this.products.forEach(p => sum+=(p.price * p.quantity));
    return sum;
  }
}


