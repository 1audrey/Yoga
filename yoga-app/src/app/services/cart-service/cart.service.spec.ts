import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call next on itemAddedSource when addItemToCart is called', () => {
    const spy = spyOn(service['itemAddedSource'], 'next');

    service.addItemToCart();

    expect(spy).toHaveBeenCalled();
  });
});
