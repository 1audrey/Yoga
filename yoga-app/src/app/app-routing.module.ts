import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BookClassesComponent } from './book-classes/book-classes.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: NavigationBarComponent },
  { path: 'book-classes', component: BookClassesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
