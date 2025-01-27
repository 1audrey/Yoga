import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../app-routing.module';
import { Location } from '@angular/common';
import { CartService } from '../services/cart-service/cart.service';
import { Subject } from 'rxjs';
import { Item } from '@app/models/item';
import { ShopService } from '@app/services/shop.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let router: Router;
  let location: Location;
  let cartService: CartService;
  let itemAddedSource: Subject<void>;
  let shopService: ShopService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      imports: [MatIconModule, 
        BrowserAnimationsModule, 
        RouterModule.forRoot(routes), 
        HttpClientTestingModule,
        MatMenuModule
      ],
      providers: [Location, ShopService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    cartService = TestBed.inject(CartService)
    shopService = TestBed.inject(ShopService)
    component = fixture.componentInstance;
    component.isShopMenuOpen = false;
    itemAddedSource = new Subject<void>();
    (cartService as any).itemAddedSource = itemAddedSource;
    (cartService as any).itemAdded$ = itemAddedSource.asObservable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the logo of the website', () => {
    const logo = fixture.debugElement.query(By.css('.logo')).nativeElement;
    const logoIcon = fixture.debugElement.query(By.css('.logo-icon')).nativeElement;

    expect(logo).toBeDefined();
    expect(logoIcon).toBeDefined();
    expect(logoIcon.innerText).toEqual('spa');
    expect(logo.getAttribute('aria-label')).toEqual('Home page');
  });

  it('should have a user icon', () => {
    const userIcon = fixture.debugElement.query(By.css('.user')).nativeElement;

    expect(userIcon).toBeDefined();
    expect(userIcon.getAttribute('aria-label')).toEqual('Log in');
  });

  it('should have a cart icon', () => {
    const cartIcon = fixture.debugElement.query(By.css('.cart')).nativeElement;

    expect(cartIcon).toBeDefined();
    expect(cartIcon.getAttribute('aria-label')).toEqual('Cart');
  });

  it('should have a book classes button', () => {
    const bookClassesButton = fixture.debugElement.query(By.css('.book-classes')).nativeElement;

    expect(bookClassesButton).toBeDefined();
    expect(bookClassesButton.innerText).toEqual('Book classes')
  });

  it('should have a shop button', () => {
    const shopButton = fixture.debugElement.query(By.css('.shop')).nativeElement;

    expect(shopButton).toBeDefined();
    expect(shopButton.innerText).toEqual('Shop')
  });

  it('shop should have a shop sub menu when shop button is clicked', () => {
    const shopButton = fixture.debugElement.query(By.css('.shop')).nativeElement;

    shopButton.click();
    fixture.detectChanges();

    const subMenu = fixture.debugElement.query(By.css('.shop-sub-menu')).nativeElement;
    expect(subMenu).toBeDefined();
  });

  it('shop should have six sub menu', () => {
    const shopButton = fixture.debugElement.query(By.css('.shop')).nativeElement;

    shopButton.click();
    fixture.detectChanges();

    const productMenu = fixture.debugElement.queryAll(By.css('.product'));

    expect(productMenu.length).toEqual(6);
    for(let i = 0; i < productMenu.length; i++){
      expect(productMenu[i].nativeElement.innerText).toEqual(component.shopSubMenu[i].name)
    }
  });

  it('shop should show right arrow icon when shop menu is closed', () => {
    const arrowIcon = fixture.debugElement.query(By.css('.arrow-right-icon')).nativeElement;

    expect(arrowIcon).toBeDefined();
  });

  it('shop should show right arrow icon when a submenu menu is clicked', () => {
    const arrowIcon = fixture.debugElement.query(By.css('.arrow-right-icon')).nativeElement;

    const shopButton = fixture.debugElement.query(By.css('.shop')).nativeElement;
    shopButton.click();
    fixture.detectChanges();

    const submenuItems = fixture.debugElement.queryAll(By.css('.product'));
    submenuItems[0].nativeElement.click();
    fixture.detectChanges();

    expect(arrowIcon).toBeDefined();
  });

  it('shop should show down arrow icon when shop menu is open', () => {
    component.isShopMenuOpen = true;
    fixture.detectChanges();

    const arrowIcon = fixture.debugElement.query(By.css('.arrow-down-icon')).nativeElement;

    expect(arrowIcon).toBeDefined();
  });

  it('should navigate through submenu items with arrow down key', () => {
    const shopButton = fixture.debugElement.query(By.css('.shop')).nativeElement;
    shopButton.click();
    fixture.detectChanges();

    const submenuItems = fixture.debugElement.queryAll(By.css('.product'));

    submenuItems[0].nativeElement.focus();
    expect(document.activeElement).toEqual(submenuItems[0].nativeElement);

    const event = new KeyboardEvent('keydown', { 
      key: 'ArrowDown', 
      code: 'ArrowDown', 
      keyCode: 40, 
      which: 40, 
      bubbles: true,
      cancelable: true });

    submenuItems[0].nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(document.activeElement).toEqual(submenuItems[1].nativeElement);
    });

    it('should close the item menu when tab is pressed', () => {
      const shopButton = fixture.debugElement.query(By.css('.shop')).nativeElement;
      shopButton.click();
      fixture.detectChanges();
    
      const submenuItems = fixture.debugElement.queryAll(By.css('.product'));
      expect(document.activeElement).toEqual(submenuItems[0].nativeElement);
    
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        code: 'Tab',
        keyCode: 9,
        which: 9,
        bubbles: true
      });
      document.activeElement?.dispatchEvent(event);
      fixture.detectChanges();
    
      expect(fixture.debugElement.queryAll(By.css('.product')).length).toBe(0);
    });
     
  
    it('shop should redirect the user to the homepage when the homepage button is clicked', async() => {
      const logo = fixture.debugElement.query(By.css('.logo')).nativeElement;

      logo.click();
      await fixture.whenStable();

      fixture.detectChanges();
      expect(location.path()).toEqual('');
    });

    it('shop should redirect the user to the book classes page when the book classes button is clicked', async() => {
      const bookButton = fixture.debugElement.query(By.css('.book-classes')).nativeElement;

      bookButton.click();
      await fixture.whenStable();

      fixture.detectChanges();
      expect(location.path()).toEqual('/book-classes');
    });

    it('shop should redirect the user to the user page when the user button is clicked', async() => {
      const userButton = fixture.debugElement.query(By.css('.user')).nativeElement;

      userButton.click();
      await fixture.whenStable();

      fixture.detectChanges();
      expect(location.path()).toEqual('/user');
    });

    it('shop should redirect the user to the cart page when the cart button is clicked', async() => {
      const cartButton = fixture.debugElement.query(By.css('.cart')).nativeElement;

      cartButton.click();
      await fixture.whenStable();

      fixture.detectChanges();
      expect(location.path()).toEqual('/cart');
    });

    it('should show the number of items in the cart', () => { 
      component.itemCount = 2;
      fixture.detectChanges();

      const itemsCount = fixture.debugElement.query(By.css('.items-count')).nativeElement;
  
      expect(itemsCount.innerText).toEqual('2');
    });

    it('should get the number of items in the cart and update the count', () => { 
      component.itemCount = 0; 
      const itemsInCart: Item[] = [{ name: 'Class', price: 10, quantity: 1 }];

      spyOn(cartService, 'getItemsFromTheCart').and.returnValue(itemsInCart);

      component.ngOnInit(); 
      itemAddedSource.next(); 
      
      expect(component.itemCount).toBe(itemsInCart.length); 
    });

    it('should stop subscription after loading', () => { 
      const subscription = component.subscription; 
      const unsubscribeSpy = spyOn(subscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });

    it('should get the sub menu form the service', () => { 
      const menu = [{name: 'All', route: 'shop-all', image:'../../assets/shop-all-yoga-clothes.jpg' }]

      const spy = spyOn(shopService, 'getShopMenu').and.returnValue(menu);

      component.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.shopSubMenu).toEqual(menu);
    });
});
