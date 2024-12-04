import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAllComponent } from './shop-all.component';
import { By } from '@angular/platform-browser';

describe('ShopAllComponent', () => {
  let component: ShopAllComponent;
  let fixture: ComponentFixture<ShopAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[ShopAllComponent],
      imports: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopAllComponent);
    component = fixture.componentInstance;
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
});
