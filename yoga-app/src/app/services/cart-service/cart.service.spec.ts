import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Item } from '@app/models/item';

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
        const itemsInCart : Item = {
          name: 'Class',
          price: 10,
          quantity: 1
        };

    service.addItemToCart(itemsInCart);

    expect(spy).toHaveBeenCalled();
  });
});
