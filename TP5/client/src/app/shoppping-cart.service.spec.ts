import { TestBed, inject } from '@angular/core/testing';

import { ShopppingCartService } from './shoppping-cart.service';

describe('ShopppingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopppingCartService]
    });
  });

  it('should ...', inject([ShopppingCartService], (service: ShopppingCartService) => {
    expect(service).toBeTruthy();
  }));
});
