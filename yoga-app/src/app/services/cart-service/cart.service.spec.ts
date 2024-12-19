import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Item } from '@app/models/item';
import { Subject } from 'rxjs';

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

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should delete items in the cart', () => {
    service.itemsInTheCart = [ { name: 'Class 20/12', price: 10, quantity: 2 },];

    service.deleteItems();

    expect(service.itemsInTheCart).toEqual([]);
  });

  it('should reset the items added when deleting items in the cart', () => {
    const spy = spyOn(service, 'resetItemAddedSource');

    service.deleteItems();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should reset itemAddedSource and itemAdded$', () => { 
    const spy = spyOn(service['itemAddedSource'], 'next');
        const itemsInCart : Item = {
          name: 'Class',
          price: 10,
          quantity: 1
        };

    service.resetItemAddedSource();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
