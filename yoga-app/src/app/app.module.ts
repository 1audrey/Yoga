import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BookClassesComponent } from './book-classes/book-classes.component';
import { UserComponent } from './user/user.component';
import { ShopAllComponent } from './shop-all/shop-all.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { ThankYouOrderComponent } from './thank-you-order/thank-you-order.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    BookClassesComponent,
    UserComponent,
    ShopAllComponent,
    HomeComponent,
    CartComponent,
    ThankYouOrderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
  ],
  providers: [NativeDateAdapter],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
