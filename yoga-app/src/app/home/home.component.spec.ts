import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
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
});
