import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavigationBarComponent],
      imports: [MatIconModule, RouterModule.forRoot(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);

  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('yoga-app');
  });

  it('should have navigation bar visible', () => {
    const navBar = fixture.debugElement.query(By.css('.navbar')).nativeElement;
    expect(navBar).toBeDefined();
  });

  it('should have heading h1 visible', () => {
    const h1 = fixture.debugElement.query(By.css('.visually-hidden')).nativeElement;
    expect(h1).toBeDefined();
  });
});
