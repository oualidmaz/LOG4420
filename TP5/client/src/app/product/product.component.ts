import { ShopppingCartService } from 'app/shoppping-cart.service';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';


declare const $: any;

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  showDialog: boolean = false;

  product: any;

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute, private productsService: ProductsService,
              private router: Router, private shoppingCart:ShopppingCartService) { 
  }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(productId);
  }

  getProduct(productId): void {
    this.productsService.getProduct(productId).then((product) => {
      if(product)
        this.product = product;
      else
        this.router.navigate(['/notfound']);
    })
    .catch((error) => console.error(error));
  }

  addToCart(f:NgForm){
    let cartItem = {
      productId:this.product.id,
      quantity:f.value['product-quantity']
    };
    
    

    this.shoppingCart.addItem(cartItem);
    this.showDialog = true;
    setTimeout(()=>{
      this.showDialog = false;
    },5000);
    //$('#dialog').fadeIn("slow").delay(5000).fadeOut();
    

  }


}
