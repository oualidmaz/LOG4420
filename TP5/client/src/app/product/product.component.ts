import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product: any;

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute, private productsService: ProductsService) { 
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
      this.product = product;
    })
    .catch((error) => console.error(error));
  }


}
