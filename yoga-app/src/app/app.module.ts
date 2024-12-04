import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BookClassesComponent } from './book-classes/book-classes.component';
import { UserComponent } from './user/user.component';
import { ShopAllComponent } from './shop-all/shop-all.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    BookClassesComponent,
    UserComponent,
    ShopAllComponent,
    HomeComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
