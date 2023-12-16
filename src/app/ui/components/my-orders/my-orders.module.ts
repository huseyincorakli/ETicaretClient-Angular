import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders.component';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:MyOrdersComponent}]),
    MatExpansionModule
  ]
})
export class MyOrdersModule { }
