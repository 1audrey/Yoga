import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HomeComponent } from './home.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BookClassesComponent } from '../book-classes/book-classes.component';
import { ShopAllComponent } from '../shop-all/shop-all.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from '../app-routing.module';
import { LocationComponent } from '@app/location/location.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, LocationComponent],
      imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(routes)
      ],
      providers: [Location, 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading h2 visible', () => {
    const h2 = fixture.debugElement.query(By.css('.visually-hidden')).nativeElement;
    expect(h2).toBeDefined();
    expect(h2.innerText).toEqual('Yoga Stretford Home Page')
  });

  it('section should have a aria label', () => {
    const section = fixture.debugElement.query(By.css('section')).nativeElement;

    expect(section.getAttribute('aria-label')).toEqual('Yoga Stretford Home Page');
  });

  it('should have a book classes button', () => {
    const button = fixture.debugElement.query(By.css('#book-classes-button')).nativeElement;

    expect(button).toBeDefined();
    expect(button.innerText).toEqual('Book a class');
    expect(button.getAttribute('role')).toEqual('link');
  });

  it('should redirect the user to the book class page when the button is clicked', async() => {
    const button = fixture.debugElement.query(By.css('#book-classes-button')).nativeElement;

    button.click();
    await fixture.whenStable();

    fixture.detectChanges();
    expect(location.path()).toEqual('/book-classes');
  });

  it('should show the yoga class image and not read it to screen readers', () => {
    const image = fixture.debugElement.query(By.css('.yoga-class')).nativeElement;

    expect(image).toBeDefined();
    expect(image.getAttribute('aria-hidden')).toEqual('true');
    expect(image.getAttribute('alt')).toEqual('Book A Yoga Class In Stretford');
  });

  it('should have a shop button', () => {
    const button = fixture.debugElement.query(By.css('#shop-all-button')).nativeElement;

    expect(button).toBeDefined();
    expect(button.innerText).toEqual('Shop all');
    expect(button.getAttribute('role')).toEqual('link');
  });

  it('should show the yoga shop image and not read it to screen readers', () => {
    const image = fixture.debugElement.query(By.css('.shop-all-image')).nativeElement;

    expect(image).toBeDefined();
    expect(image.getAttribute('aria-hidden')).toEqual('true');
    expect(image.getAttribute('alt')).toEqual('Shop All');
  });

  it('should redirect the user to the book class page when the button is clicked', async() => {
    const button = fixture.debugElement.query(By.css('#shop-all-button')).nativeElement;

    button.click();
    await fixture.whenStable();

    fixture.detectChanges();
    expect(location.path()).toEqual('/shop-all');
  });

  it('should show the class location', () => {
    const classLocation = fixture.debugElement.query(By.css('location')).nativeElement;

    expect(classLocation).toBeDefined();
  });
});
