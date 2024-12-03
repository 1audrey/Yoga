import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookClassesComponent } from './book-classes.component';

describe('BookClassesComponent', () => {
  let component: BookClassesComponent;
  let fixture: ComponentFixture<BookClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
