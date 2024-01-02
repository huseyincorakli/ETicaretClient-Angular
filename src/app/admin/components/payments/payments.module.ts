import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:PaymentsComponent}
    ]),
  ]
})
export class PaymentsModule { }
