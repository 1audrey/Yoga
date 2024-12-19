import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ShopAllComponent } from './shop-all.component';
import { By } from '@angular/platform-browser';
import { ShopService } from '@app/services/shop.service';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { routes } from '@app/app-routing.module';
import { Item } from '@app/models/item';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from '@app/services/cart-service/cart.service';

describe('ShopAllComponent', () => {
  let component: ShopAllComponent;
  let fixture: ComponentFixture<ShopAllComponent>;
  let location: Location;
  let shopService: ShopService;
  let httpMock: HttpTestingController;
  let cartService: CartService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[ShopAllComponent],
      imports: [MatCardModule, RouterModule.forRoot(routes), HttpClientTestingModule, RouterModule], 
      providers: [Location, ShopService, CartService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopAllComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    shopService = TestBed.inject(ShopService);
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading h2 visible', () => {
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

    const req = httpMock.expectOne('assets/items.json'); 
    expect(req.request.method).toBe('GET'); 
    req.flush(mockItems); 
    
    expect(component.items).toEqual(mockItems);
  }); 

  it('should have all the items', () => { 
    const expectedItems = getExpectedItems();

    const req = httpMock.expectOne('assets/items.json'); 
    expect(req.request.method).toBe('GET'); 
    req.flush(expectedItems); 

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
      expect(prices[index].nativeElement.getAttribute('aria-label')).toEqual('Price' + expectedItems[index].price +'pounds');
      expect(images[index].nativeElement.getAttribute('src')).toEqual(expectedItems[index].image);
      expect(images[index].nativeElement.getAttribute('alt')).toEqual(expectedItems[index].name);
      expect(images[index].nativeElement.getAttribute('aria-hidden')).toEqual('true');
      expect(buttons[index].nativeElement.getAttribute('role')).toEqual('link');
      expect(buttons[index].nativeElement.getAttribute('aria-label')).toEqual('Add' + expectedItems[index].name + 'to cart');
    }
  });

  it('should add to the cart when add to cart button is clicked', () => {
    component.items = getExpectedItems();
    const spy = spyOn(component, 'addToCart');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.action-button.add-to-cart')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(component.items[0]);
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

  function getExpectedMenu(){
    return [
      {name: 'Men Clothes', route: 'men-clothes', image:'../../assets/menu/shop-men-yoga-clothes.jpg'},
      {name: 'Women Clothes', route: 'women-clothes', image:'../../assets/menu/shop-women-yoga-clothes.jpg'},
      {name: 'Mats', route:'yoga-mats', image:'../../assets/menu/yoga-mats.jpg'},
      {name: 'Accessories', route:'yoga-accessories', image:'../../assets/menu/yoga-accessories.jpg'},
      {name: 'Vouchers', route: 'vouchers', image:'../../assets/menu/yoga-vouchers.jpg'}]
  }

  function getExpectedItems(){
    return [
      {name: `Yoga legging pink`, price: 40, quantity: 20, image: ''}
    ]
  }
});
