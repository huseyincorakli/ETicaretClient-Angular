import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { PayComponent } from './pay/pay.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    PayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:CheckoutComponent}])
  ]
})
export class CheckoutModule { }
