import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookClassesComponent } from './book-classes.component';
import { By } from '@angular/platform-browser';


describe('BookClassesComponent', () => {
  let component: BookClassesComponent;
  let fixture: ComponentFixture<BookClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookClassesComponent],
      imports: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading h2 visible', () => {
    const h2 = fixture.debugElement.query(By.css('.visually-hidden')).nativeElement;
    expect(h2).toBeDefined();
    expect(h2.innerText).toEqual('Book a Yoga Class')
  });
});
