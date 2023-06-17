import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
//  286. Another Reuseable Input
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, //  286. Another Reuseable Input
  ],
  exports: [
    InputComponent // 286. Another Reuseable Input
  ]
})
export class SharedModule { }
