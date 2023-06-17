import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
// 282. Nasty Async Validators
import { HttpClientModule } from '@angular/common/http';

/* 303. Http Interceptor : 
* to make sure that we can configure our requests so that the options {withCredentials: true}
* is defaulted
*/
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    // 282. Nasty Async Validators
    HttpClientModule
  ],
  /* 303. Http Interceptor*/
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
