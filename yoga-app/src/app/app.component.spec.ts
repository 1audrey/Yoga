import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatIconModule } from '@angular/material/icon';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavigationBarComponent],
      imports: [MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(By.css('.navigation-bar')).nativeElement;
    expect(navbar).toBeDefined();
  });
});
