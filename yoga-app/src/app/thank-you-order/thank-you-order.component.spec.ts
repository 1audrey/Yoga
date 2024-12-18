import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouOrderComponent } from './thank-you-order.component';
import { By } from '@angular/platform-browser';

describe('ThankYouOrderComponent', () => {
  let component: ThankYouOrderComponent;
  let fixture: ComponentFixture<ThankYouOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThankYouOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThankYouOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the thank you message and read it to screen readers', () => {
    const message = fixture.debugElement.query(By.css('#thank-you-banner')).nativeElement;

    expect(message).toBeDefined();
    expect(message.getAttribute('aria-live')).toEqual('assertive');
    expect(message.getAttribute('aria-atomic')).toEqual('true');
  });

  it('should show the thank you image and not read it to screen readers', () => {
    const image = fixture.debugElement.query(By.css('.thank-you-image')).nativeElement;

    expect(image).toBeDefined();
    expect(image.getAttribute('aria-hidden')).toEqual('true');
    expect(image.getAttribute('alt')).toEqual('Yoga Stretford Thank You');
  });
});
