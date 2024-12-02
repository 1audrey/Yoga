import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule // Required for Angular Material animations
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
