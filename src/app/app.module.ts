import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.route';
import { LoginLoader } from './services/auth-guards/can-load-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared-module/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    LoginLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
