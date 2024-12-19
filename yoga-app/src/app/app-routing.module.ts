import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookClassesComponent } from './book-classes/book-classes.component';
import { UserComponent } from './user/user.component';
import { ShopAllComponent } from './shop-all/shop-all.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ThankYouOrderComponent } from './thank-you-order/thank-you-order.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'book-classes', component: BookClassesComponent },
  { path: 'user', component: UserComponent },
  { path: 'shop-all', component: ShopAllComponent },
  { path: 'cart', component: CartComponent },
  { path:'thank-you', component: ThankYouOrderComponent },
  { path: 'men-clothes', component: ThankYouOrderComponent },
  { path: 'women-clothes', component: ThankYouOrderComponent },
  { path: 'yoga-mats', component: ThankYouOrderComponent },
  { path: 'yoga-accessories', component: ThankYouOrderComponent },
  { path: 'vouchers', component: ThankYouOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
