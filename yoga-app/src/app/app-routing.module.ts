import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookClassesComponent } from './book-classes/book-classes.component';
import { UserComponent } from './user/user.component';
import { ShopAllComponent } from './shop-all/shop-all.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'book-classes', component: BookClassesComponent },
  { path: 'user', component: UserComponent },
  { path: 'shop-all', component: ShopAllComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
