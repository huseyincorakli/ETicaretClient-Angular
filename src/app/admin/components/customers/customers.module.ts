import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';
import { SignalRService } from 'src/app/services/common/signalr.service';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';



@NgModule({
  declarations: [
    CustomersComponent,
    CheckoutFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:CustomersComponent}])
  ],
  providers:[
    SignalRService
  ]
})
export class CustomersModule { }
