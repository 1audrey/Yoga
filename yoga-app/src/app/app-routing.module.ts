import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookClassesComponent } from './book-classes/book-classes.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: AppComponent },
  { path: 'book-classes', component: BookClassesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
