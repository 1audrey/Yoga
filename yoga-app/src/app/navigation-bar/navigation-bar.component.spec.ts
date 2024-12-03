import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      imports: [MatIconModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
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
    const userIcon = fixture.debugElement.query(By.css('.user-icon')).nativeElement;

    expect(userIcon).toBeDefined();
    expect(userIcon.getAttribute('aria-label')).toEqual('Log in');

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

});
