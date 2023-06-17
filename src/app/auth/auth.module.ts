import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

// 276. Adding Signup Form
import { ReactiveFormsModule } from '@angular/forms';

// 286. Another Reuseable Input
import { SharedModule } from '../shared/shared.module';
import { SignoutComponent } from './signout/signout.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SignoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    // 276. Adding Signup Form
    ReactiveFormsModule,
    // 286. Another Reuseable Input
    SharedModule
  ]
})
export class AuthModule { }
