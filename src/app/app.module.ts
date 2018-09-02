import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.route';
import { GlobalService } from './services/global.service';
import { LoginLoader } from './services/auth-guards/can-load-login';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes
  ],
  providers: [
    LoginLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
