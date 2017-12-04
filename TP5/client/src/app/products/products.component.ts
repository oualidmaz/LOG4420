import { ProductsService } from './../products.service';
import { Component } from '@angular/core';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {

  products = [];
  selectedCategory = 'all';
  selectedCriteria = 'price-asc';
  categoryClicked : boolean = false;
  constructor(private productsService: ProductsService) {
  };

  ngOnInit() {
    this.productsService.getProducts('price-asc').then((products) => {
      this.products = products;
    })
      .catch((error) => console.error(error));
  }


  sortProducts(sortingCriteria, category): void {
    this.productsService.getProducts(sortingCriteria, category).then((products) => {
      this.products = products;
      console.log(this.products);
    })
      .catch((error) => console.error(error));
  }

  onCategoryClick(category): void {
    this.selectedCategory = category;
  }

  onCriteriaClick(criteria): void {
    this.selectedCriteria = criteria;
  }



}
