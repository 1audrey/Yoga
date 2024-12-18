import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookClassesComponent } from './book-classes.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';
import { CartService } from '../services/cart-service/cart.service';
import { Item } from '@app/models/item';

describe('BookClassesComponent', () => {
  let component: BookClassesComponent;
  let fixture: ComponentFixture<BookClassesComponent>;
  let datepicker: MatDatepicker<Date>;
  let router: Router;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookClassesComponent],
      imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(routes),
        RouterModule,
      ],
      providers: [NativeDateAdapter, CartService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookClassesComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    fixture.detectChanges();

    datepicker = fixture.debugElement.query(By.directive(MatDatepicker)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading h2 visible', () => {
    const h2 = fixture.debugElement.query(By.css('.visually-hidden')).nativeElement;
    expect(h2).toBeDefined();
    expect(h2.innerText).toEqual('Book a Yoga Class')
  });

  it('section should have a aria label', () => {
    const section = fixture.debugElement.query(By.css('section')).nativeElement;

    expect(section.getAttribute('aria-label')).toEqual('Book a Yoga Class');
  });

  it('should have date picker', () => {
    const calendar = fixture.debugElement.query(By.css('.date-picker')).nativeElement;

    expect(calendar).toBeDefined();
  });

  it('should have available dates highlighted', async() => {
    const toggle = fixture.debugElement.query(By.css('.mat-datepicker-toggle button')).nativeElement;

    toggle.click();
    await fixture.whenStable();
    fixture.detectChanges();

    const preSelectedDates = fixture.debugElement.query(By.css('.example-custom-date-class')).nativeElement;
    expect(preSelectedDates).toBeDefined();
  });

  it('should have every wednesdays and saturdays as pre selected dates', async() => {
    const toggle = fixture.debugElement.query(By.css('.mat-datepicker-toggle button')).nativeElement;

    toggle.click();
    await fixture.whenStable();
    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.css('.mat-calendar-body-cell'));
    cells.forEach( cell => {
      const cellDate = new Date(cell.nativeElement.getAttribute('aria-label'));
      const day = cellDate.getDay();
      if (day === 3 || day === 6) {
        expect(cell.classes['example-custom-date-class']).toBeDefined();
      }
      else
      { expect(cell.classes['example-custom-date-class']).not.toBeDefined(); }
    });
  });

  it('should disable dates that are not pre selected dates', async() => {
    const toggle = fixture.debugElement.query(By.css('.mat-datepicker-toggle button')).nativeElement;

    toggle.click();
    await fixture.whenStable();
    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.css('.mat-calendar-body-cell'));
    cells.forEach(cell =>
      { const cellDate = new Date(cell.nativeElement.getAttribute('aria-label'));
        const day = cellDate.getDay();
        if (day !== 3 && day !== 6) {
          expect(cell.nativeElement.classList).toContain('mat-calendar-body-disabled'); }
        else {
          expect(cell.nativeElement.classList).not.toContain('mat-calendar-body-disabled'); }
      });
  });

  it('should have a add to cart button', () => {
    const button = fixture.debugElement.query(By.css('.action-button')).nativeElement;
    expect(button).toBeDefined();
    expect(button.getAttribute('aria-label')).toEqual('Add to cart');
    expect(button.innerText).toEqual('Add to cart');
  });

  it('should add to the cart when add to cart button is clicked', () => {
    component.selectedDate = new Date();
    fixture.detectChanges();

    const spy = spyOn(component, 'addToCart');

    const button = fixture.debugElement.query(By.css('.action-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should disable the add to the cart button when no date is selecte', () => {
    const button = fixture.debugElement.query(By.css('.action-button')).nativeElement;

    expect(button.disabled).toBeTruthy();
  });

  it('should enable the add to the cart button when a date is selecte', () => {
    component.selectedDate = new Date();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.action-button')).nativeElement;

    expect(button.disabled).toBeFalsy;
  });

  it('should redirect the user to the cart page when a class is added to the cart', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.selectedDate = new Date();

    component.addToCart();

    expect(routerSpy).toHaveBeenCalled();
  });

  it('should not redirect the user to the cart page if no date is selected', () => {
    const routerSpy = spyOn(router, 'navigate');

    component.addToCart();

    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should add a class to the cart', () => {
    const cartSpy = spyOn(cartService, 'addItemToCart');
    component.selectedDate = new Date();
    let item: Item = {
      name: `Class on the ${component.selectedDate.toLocaleDateString()}`,
      price: 10,
      quantity: 1,
    };

    component.addToCart();
    expect(cartSpy).toHaveBeenCalledOnceWith(item);
  });
});
