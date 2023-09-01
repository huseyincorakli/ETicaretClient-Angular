import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';
import { SignalRService } from 'src/app/services/common/signalr.service';



@NgModule({
  declarations: [
    CustomersComponent
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
