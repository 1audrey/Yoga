import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ShopAllComponent } from './shop-all.component';
import { By } from '@angular/platform-browser';
import { ShopService } from '@app/services/shop.service';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { routes } from '@app/app-routing.module';
import { Item } from '@app/models/item';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from '@app/services/cart-service/cart.service';
import { FiltersComponent } from './filters/filters.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { Observable, of } from 'rxjs';

describe('ShopAllComponent', () => {
  let component: ShopAllComponent;
  let fixture: ComponentFixture<ShopAllComponent>;
  let location: Location;
  let shopService: ShopService;
  let httpMock: HttpTestingController;
  let cartService: CartService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopAllComponent, FiltersComponent],
      imports: [MatCardModule, 
        RouterModule.forRoot(routes),
        HttpClientTestingModule, 
        RouterModule, 
        MatExpansionModule, 
        MatSliderModule,
        BrowserAnimationsModule,
        MatChipsModule],
      providers: [Location, ShopService, CartService, 
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ type: 'initial-type' })
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShopAllComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    shopService = TestBed.inject(ShopService);
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute)
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading h2 visually hidden', () => {
    const h2 = fixture.debugElement.query(By.css('.visually-hidden')).nativeElement;
    expect(h2).toBeDefined();
    expect(h2.innerText).toEqual('Shop All Products')
  });

  it('section should have a aria label on the section', () => {
    const section = fixture.debugElement.query(By.css('section')).nativeElement;

    expect(section.getAttribute('aria-label')).toEqual('Shop All Products');
  });
  
  it('should show short description if not toggle', () => {
    const description = fixture.debugElement.query(By.css('.short-description')).nativeElement;

    expect(description).toBeDefined();
  });

  it('should show long description if toggle', () => {
    component.toggle = true;
    fixture.detectChanges();

    const description = fixture.debugElement.query(By.css('.long-description')).nativeElement;

    expect(description).toBeDefined();
  });

  it('should toggle when Read More button are clicked', () => { 
    component.toggle = false;   
    const spy = spyOn(component, 'toggleDescription').and.callThrough();

    const button = fixture.debugElement.query(By.css('.toggle-description.read-more')).nativeElement;
    button.click();
    
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.toggle).toBeTrue();
  });

  it('should toggle when Read Less button are clicked', () => { 
    component.toggle = true;   
    fixture.detectChanges();
    const spy = spyOn(component, 'toggleDescription').and.callThrough();

    const button = fixture.debugElement.query(By.css('.toggle-description.read-less')).nativeElement;
    button.click();
    
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.toggle).toBeFalse();
  });

  it('should have a contact us button if toggle', () => {
    component.toggle = true;
    fixture.detectChanges();

    const contact = fixture.debugElement.query(By.css('.contact-us')).nativeElement;

    expect(contact).toBeDefined();
    expect(contact.getAttribute('role')).toEqual('link');
  });

  it('shop should redirect the user to the home page when the contact us button is clicked', async() => {
    component.toggle = true;   
    fixture.detectChanges();

    const contact = fixture.debugElement.query(By.css('.contact-us')).nativeElement;

    contact.click();
    await fixture.whenStable();

    fixture.detectChanges();
    expect(location.path()).toEqual('');
  });

  it('should show 3 buttons to best selling pages', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.action-button.best-selling'));

    expect(buttons).toBeDefined();
    expect(buttons.length).toEqual(3);
    expect(buttons[0].nativeElement.getAttribute('role')).toEqual('link');
    expect(buttons[1].nativeElement.getAttribute('role')).toEqual('link');
    expect(buttons[2].nativeElement.getAttribute('role')).toEqual('link');
  });

  it('should get the sub menu from the service', () => { 
    const expectedMenu = getExpectedMenu();
    const spy = spyOn(shopService, 'getShopMenu').and.returnValue(expectedMenu)

    component.ngOnInit();

    expect(spy).toHaveBeenCalledTimes(1);
  }); 

  it('should return the right submenus', () => { 
    const expectedMenu = getExpectedMenu();

    expect(component.shopMenu).toEqual(expectedMenu);
  });

  it('should have a shop per submenu', () => { 
    const expectedMenu = getExpectedMenu();

    const shops = fixture.debugElement.queryAll(By.css('.card.submenu')); 
    const titles = fixture.debugElement.queryAll(By.css('.title.submenu'));
    const images = fixture.debugElement.queryAll(By.css('.image.submenu'));
    const buttons = fixture.debugElement.queryAll(By.css('.action-button.shop')); 
    expect(component.shopMenu).toEqual(expectedMenu);
    expect(shops.length).toEqual(expectedMenu.length);
    for (let index = 0; index<titles.length; index++){
      expect(titles[index].nativeElement.innerText).toEqual(expectedMenu[index].name);
      expect(titles[index].nativeElement.getAttribute('aria-label')).toEqual(expectedMenu[index].name);
      expect(images[index].nativeElement.getAttribute('src')).toEqual(expectedMenu[index].image);
      expect(images[index].nativeElement.getAttribute('alt')).toEqual(`Shop ${expectedMenu[index].name}`);
      expect(images[index].nativeElement.getAttribute('aria-hidden')).toEqual('true');
      expect(buttons[index].nativeElement.getAttribute('role')).toEqual('link');
      expect(buttons[index].nativeElement.getAttribute('aria-label')).toEqual(`Shop ${expectedMenu[index].name}`);
    }
  });

  it('should redirect to the specific shop when button is clicked', async() => { 
    const expectedMenu = getExpectedMenu();
    const subMenus = fixture.debugElement.queryAll(By.css('.action-button.shop')); 

    for (let index = 0; index<subMenus.length; index++){

      subMenus[index].nativeElement.click();
      await fixture.whenStable();

      fixture.detectChanges();
      expect(location.path()).toEqual(`/${expectedMenu[index].route}`);
    }
  });

  it('should get the items from the service', () => {
    const mockItems = getExpectedItems();
    route.params = of({ type: 'default' });
    spyOn(shopService, 'getItems').and.returnValue(of(mockItems));
  
    component.ngOnInit();
    expect(component.items).toEqual(mockItems);
  
    const req = httpMock.expectOne('assets/items.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  it('should have all the items', () => { 
    const expectedItems = getExpectedItems();
    const mockItems = getExpectedItems();
    route.params = of({ type: 'default' });
    spyOn(shopService, 'getItems').and.returnValue(of(mockItems));

    const req = httpMock.expectOne('assets/items.json'); 
    expect(req.request.method).toBe('GET'); 
    req.flush(expectedItems); 

    component.ngOnInit();
    fixture.detectChanges();

    const shops = fixture.debugElement.queryAll(By.css('.card.item')); 
    const titles = fixture.debugElement.queryAll(By.css('.title.item'));
    const prices = fixture.debugElement.queryAll(By.css('.price'));
    const images = fixture.debugElement.queryAll(By.css('.image.item'));
    const buttons = fixture.debugElement.queryAll(By.css('.action-button.add-to-cart')); 

    expect(component.items).toEqual(expectedItems);
    expect(shops.length).toEqual(expectedItems.length);
    for (let index = 0; index<shops.length; index++){
      expect(titles[index].nativeElement.innerText).toEqual(expectedItems[index].name);
      expect(titles[index].nativeElement.getAttribute('aria-label')).toEqual(expectedItems[index].name);
      expect(titles[index].nativeElement.getAttribute('role')).toEqual('heading');
      expect(prices[index].nativeElement.getAttribute('role')).toEqual('text');
      expect(prices[index].nativeElement.getAttribute('aria-label')).toEqual('Price' + expectedItems[index].price +'pounds');
      expect(images[index].nativeElement.getAttribute('src')).toEqual(expectedItems[index].image);
      expect(images[index].nativeElement.getAttribute('alt')).toEqual(expectedItems[index].name);
      expect(images[index].nativeElement.getAttribute('aria-hidden')).toEqual('true');
      expect(buttons[index].nativeElement.getAttribute('role')).toEqual('button');
      expect(buttons[index].nativeElement.getAttribute('aria-label')).toEqual('Add ' + expectedItems[index].name + ' to cart');
    }
  });

  it('should add to the cart when add to cart button is clicked', () => {
    component.filteredItems = getExpectedItems();
    component.filteredItems[0].desiredQuantity = 1;

    const spy = spyOn(component, 'addToCart');

    fixture.detectChanges();

    const button = fixture.debugElement.queryAll(By.css('.action-button.add-to-cart'))[0].nativeElement;
    button.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(component.filteredItems[0]);
  });

  it('should add an item to the cart', () => {
    const cartSpy = spyOn(cartService, 'addItemToCart');
    component.items = getExpectedItems();

    component.addToCart(component.items[0]);
    expect(cartSpy).toHaveBeenCalledOnceWith(component.items[0]);
  });

  it('should redirect the user to the cart page when an tiem is added to the cart', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.items = getExpectedItems();

    component.addToCart(component.items[0]);

    expect(routerSpy).toHaveBeenCalledTimes(1);
  });

 it('should have a decrease quantity button', () => {
    component.filteredItems = getExpectedItems();

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.decrease-qty')).nativeElement;

    expect(button).toBeDefined();
    expect(button.getAttribute('role')).toEqual('button');
    expect(button.getAttribute('aria-label')).toEqual('Decrease Quantity');
    expect(button.innerText).toEqual('-');
  });

  it('should have an increase quantity button', () => {
    component.filteredItems = getExpectedItems();

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.increase-qty')).nativeElement;

    expect(button).toBeDefined();
    expect(button.getAttribute('role')).toEqual('button');
    expect(button.getAttribute('aria-label')).toEqual('Increase Quantity');
    expect(button.innerText).toEqual('+');
  });

  it('should show zero if the desired quantity is not defined', () => {
    component.filteredItems = getExpectedItems();

    fixture.detectChanges();
    
    const quantity = fixture.debugElement.query(By.css('.quantity')).nativeElement;

    expect(quantity.innerText).toEqual('0');
  });

  it('should show the desired quantity', () => {
    component.filteredItems = getExpectedItems();
    component.filteredItems[0].desiredQuantity = 2;

    fixture.detectChanges();
    
    const quantity = fixture.debugElement.queryAll(By.css('.quantity'))[0].nativeElement;

    expect(quantity.innerText).toEqual('2');
    expect(quantity.getAttribute('aria-live')).toEqual('polite');
  });

  it('should increase the quantity when the button is clicked', () => {
    component.filteredItems = getExpectedItems();
    const spy = spyOn(component, 'increaseQuantity');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.increase-qty')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should increase the desired quantity', () => {
    component.filteredItems = getExpectedItems();
    component.filteredItems[0].desiredQuantity = 2;
    
    component.increaseQuantity(component.filteredItems[0]);

    expect(component.filteredItems[0].desiredQuantity).toEqual(3);
  });

  it('should not increase the desired quantity if there is not enough stock available', () => {
    component.filteredItems = getExpectedItems();
    component.filteredItems[0].desiredQuantity = 2;
    component.filteredItems[0].quantity = 2;
    
    component.increaseQuantity(component.filteredItems[0]);

    expect(component.filteredItems[0].desiredQuantity).toEqual(2);
  });

  it('should show error message when the desired quantity is lower than the stock available', () => {
    component.filteredItems = getExpectedItems();
    component.filteredItems[0].desiredQuantity = 2;
    component.filteredItems[0].quantity = 2;

    component.increaseQuantity(component.filteredItems[0]);
    fixture.detectChanges();
    
    const error = fixture.debugElement.query(By.css('.no-stock-message')).nativeElement;

    expect(error).toBeDefined();
    expect(error.getAttribute('role')).toEqual('alert');
    expect(error.getAttribute('aria-label')).toEqual('Not enough stock available for more');
    expect(error.innerText).toEqual('Not enough stock available for more');
    expect(component.outOfStock[component.filteredItems[0].name]).toBeTrue();
  });

  it('should not show error message when the desired quantity is equal to the stock available', () => {
    component.filteredItems = getExpectedItems();
    component.filteredItems[0].desiredQuantity = 1;
    component.filteredItems[0].quantity = 2;

    component.increaseQuantity(component.filteredItems[0]);
    fixture.detectChanges();
    
    expect(component.outOfStock[component.filteredItems[0].name]).not.toBeDefined();
  });

  it('should increase the desired quantity if the desired quantity is undefined', () => {
    component.filteredItems = getExpectedItems();
    
    component.increaseQuantity(component.filteredItems[0]);

    expect(component.filteredItems[0].desiredQuantity).toEqual(1);
  });

  it('should decrease the quantity when the button is clicked', () => {
    component.filteredItems = getExpectedItems();
    const spy = spyOn(component, 'decreaseQuantity');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.decrease-qty')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should decrease the desired quantity', () => {
    component.filteredItems = getExpectedItems();
    component.filteredItems[0].desiredQuantity = 2
    
    component.decreaseQuantity(component.filteredItems[0]);

    expect(component.filteredItems[0].desiredQuantity).toEqual(1);
  });

  it('should disable the add to cart button if the desired quantity is zero', () => {
    component.filteredItems = getExpectedItems();
    component.filteredItems[0].desiredQuantity = 0;
    
    fixture.detectChanges();
    const addCartButton = fixture.debugElement.queryAll(By.css('.add-to-cart'))[0].nativeElement;

    expect(addCartButton.disabled).toBeTruthy();
  });

  it('should disable the add to cart button if the desired quantity is undefined', () => {
    component.filteredItems = getExpectedItems();
    
    fixture.detectChanges();
    const addCartButton = fixture.debugElement.queryAll(By.css('.add-to-cart'))[0].nativeElement;

    expect(addCartButton.disabled).toBeTruthy();
  });

  it('should return zero if the desired quantity is undefined and the desired quantity is decreases', () => {
    component.filteredItems = getExpectedItems();
    
    component.decreaseQuantity(component.filteredItems[0]);

    expect(component.filteredItems[0].desiredQuantity).toEqual(0);
  });

  it('should filter the shop', () => {
    const filters = fixture.debugElement.query(By.css('filters')).nativeElement;

    expect(filters).toBeDefined();
  });

  it('should return the filtered items on initialisation', () => {
    component.items = getExpectedItems();

    component.ngOnInit();

    expect(component.filteredItems).toEqual(component.items);
  });

  it('should return the maximum price of all items', () => {
    const items = of(getExpectedItems());
    route.params = of({ type: 'default' });
    spyOn(shopService, 'getItems').and.returnValue(items);
    const expectedMaxPrice = Math.max(...getExpectedItems().map(item => item.price));

    component.ngOnInit();

    expect(component.maxPrice).toEqual(expectedMaxPrice);
  });

  it('should filter the items by prices', () => {
    component.items = getExpectedItems();
    const maxPrice = 40;

    component.onFilterItems(maxPrice);

    expect(component.filteredItems).toEqual([component.items[0]]);
    expect(component.filteredItems.length).toEqual(1);
  });

  it('should update selectedColours and call filterItems', () => {
    const colours = ['red', 'blue'];

    component.onFilterColours(colours);

    expect(component.selectedColours).toEqual(colours);
  });

  it('should filter items correctly including multicolour items', () => {
    const mockItems: Item[] = [
      { name: 'Item 1', price: 100, colour: 'red', quantity: 10 },
      { name: 'Item 2', price: 200, colour: 'blue', quantity: 5 },
      { name: 'Item 3', price: 150, colour: 'red/blue', quantity: 8 },
      { name: 'Item 4', price: 250, colour: 'green', quantity: 3 }
    ];

    route.params = of({ type: 'default' });
    spyOn(shopService, 'getItems').and.returnValue(of(mockItems));

    component.ngOnInit();

    component.onFilterColours(['multicolour']);
    expect(component.filteredItems).toEqual([
      { name: 'Item 3', price: 150, colour: 'red/blue', quantity: 8 }
    ]);

    component.onFilterColours(['red', 'multicolour']);
    expect(component.filteredItems).toEqual([
      { name: 'Item 1', price: 100, colour: 'red', quantity: 10 },
      { name: 'Item 3', price: 150, colour: 'red/blue', quantity: 8 }
    ]);
  });

  [
    { type: 'women', expectedRouteType: 'women' },
    { type: '', expectedRouteType: 'default' }
  ].forEach(({ type, expectedRouteType }) => {
    it(`should set routeType to '${expectedRouteType}' and return the items`, (() => {
      const items = of(getExpectedItems());
      const expectedItems = getExpectedItems()
      route.params = of({ type });
      spyOn(shopService, 'getItems').and.returnValue(items);

      component.ngOnInit();
        expect(component.routeType).toEqual(expectedRouteType);
        expect(shopService.getItems).toHaveBeenCalled();
        expect(component.items).toEqual(expectedItems);
    }));
  });

  function getExpectedMenu(){
    return [
      {name: 'Men Clothes', route: 'men-clothes', image:'../../assets/menu/shop-men-yoga-clothes.jpg'},
      {name: 'Women Clothes', route: 'shop-all/women', image:'../../assets/menu/shop-women-yoga-clothes.jpg'},
      {name: 'Mats', route:'yoga-mats', image:'../../assets/menu/yoga-mats.jpg'},
      {name: 'Accessories', route:'yoga-accessories', image:'../../assets/menu/yoga-accessories.jpg'},
      {name: 'Vouchers', route: 'vouchers', image:'../../assets/menu/yoga-vouchers.jpg'}]
  }

  function getExpectedItems(){
    return [
      {name: `Yoga legging pink`, price: 40, quantity: 20, image: "../../assets/shop/women/woman-pink-set.jpg"},
      {name: `Yoga legging black`, price: 45, quantity: 10, image: "../../assets/shop/women/woman-black-set.jpg"}

    ]
  }
});
