import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { By } from '@angular/platform-browser';
import { Item } from '../models/item';
import { CartService } from '@app/services/cart-service/cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [CartService]  
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have accessible heading and section', () => {
    const section =fixture.debugElement.query(By.css('section')).nativeElement;
    const header =fixture.debugElement.query(By.css('h2')).nativeElement;

    expect(header.innerText).toEqual('Cart');
    expect(section.getAttribute('aria-label')).toEqual('Cart');
  });

  it('should specify that the cart is empty in a message', () => {
    component.itemsInCart = [];

    fixture.detectChanges();
    
    const emptyMessage =fixture.debugElement.query(By.css('.empty-cart-message')).nativeElement;

    expect(emptyMessage).toBeDefined();
    expect(emptyMessage.innerText).toEqual('Your cart is empty');
  });

  it('should show the items details in the cart', () => {
    component.itemsInCart = generateListOfItems(1);

    fixture.detectChanges();
    
    const items = fixture.debugElement.query(By.css('.cart-items')).nativeElement;
    const itemName = fixture.debugElement.queryAll(By.css('.item-name'));
    const itemPrice = fixture.debugElement.queryAll(By.css('.item-price'));
    const itemQuantity = fixture.debugElement.queryAll(By.css('.item-quantity'));

    expect(items).toBeDefined();
    expect(itemName.length).toEqual(component.itemsInCart.length);
    expect(itemName[0].nativeElement.innerText).toEqual(component.itemsInCart[0].name);
    expect(itemPrice[0].nativeElement.innerText).toEqual(`£${component.itemsInCart[0].price}`);
    expect(itemQuantity[0].nativeElement.innerText).toEqual(`x ${component.itemsInCart[0].quantity}`);
  });

  it('should show the items details and total price in the cart with accessibility', () => {
    component.itemsInCart = generateListOfItems(1);

    fixture.detectChanges();
    
    const itemName = fixture.debugElement.queryAll(By.css('.item-name'));
    const itemPrice = fixture.debugElement.queryAll(By.css('.item-price'));
    const itemQuantity = fixture.debugElement.queryAll(By.css('.item-quantity'));

    expect(itemName[0].nativeElement.getAttribute('aria-label')).toEqual('Item name: ' + component.itemsInCart[0].name);
    expect(itemPrice[0].nativeElement.getAttribute('aria-label')).toEqual('Item price: £' + component.itemsInCart[0].price);
    expect(itemQuantity[0].nativeElement.getAttribute('aria-label')).toEqual('Item quantity: ' + component.itemsInCart[0].quantity);
  });

  it('should show the total to pay', () => {
    const itemsInCart = generateListOfItems(2);
    spyOn(cartService, 'getItemsFromTheCart').and.returnValue(itemsInCart);

    component.ngOnInit(); 
    fixture.detectChanges();
    
    const totalLabel = fixture.debugElement.query(By.css('.total')).nativeElement;
    const totalPrice = fixture.debugElement.query(By.css('.total-price')).nativeElement;

    expect(totalPrice.innerText).toEqual(`Total: £${itemsInCart[0].price + itemsInCart[1].price}`);
    expect(totalLabel.getAttribute('aria-label')).toEqual('Total price: £' + (itemsInCart[0].price + itemsInCart[1].price));

  });
  
  it('should have a pay now button', () => {
    component.itemsInCart = generateListOfItems(1);

    fixture.detectChanges();
    
    const button =fixture.debugElement.query(By.css('.pay-now')).nativeElement;

    expect(button).toBeDefined();
  });

  it('should pay items when button is clicked', () => {
    const spy = spyOn(component, 'payItems');

    component.itemsInCart = generateListOfItems(1);
    
    fixture.detectChanges();
    
    const button = fixture.debugElement.query(By.css('.pay-now')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  function generateListOfItems(numberOfItem: number): Item[] {
    let items: Item[] = [];

    for (let index = 0; index < numberOfItem; index ++){
      const itemInCart : Item = {
        name: `Class ${index}`,
        price: 10,
        quantity: 1,
      };
      items.push(itemInCart);
    }
  return items;
  }
});
