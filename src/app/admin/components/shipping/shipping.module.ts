import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from './shipping.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    ShippingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ShippingComponent}
    ]),
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule
  ]
})
export class ShippingModule { }
