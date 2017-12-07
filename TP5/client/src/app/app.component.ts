import { OnShoppingCartUpdated } from './shoppping-cart.service';
import { ShopppingCartService } from 'app/shoppping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  implements OnInit, OnShoppingCartUpdated {
 
  subscription: Subscription;
  count: number;


  // TODO: Modifier le nom des auteurs pour vos noms
  readonly authors = [
    'Oualid Mazouzi 1548314',
    'Yves Israel Ngudie 1719325'
  ];

  /**
   *
   */
  constructor(private shoppingCart:ShopppingCartService) {
      this.shoppingCart.subscribe(this);
  }
  ngOnInit(): void {
    this.shoppingCart.itemCount()
                     .subscribe(count=> this.count = count);
  }
  onCartUpdated() {
    this.count = this.shoppingCart.count
    console.log(this.count);
  }
  get cartItems(){
    return this.count;
  }
}
