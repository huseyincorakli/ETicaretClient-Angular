import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsComponent } from './baskets.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    BasketsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:BasketsComponent}])
    ,
    FormsModule
  ],
  exports:[
    BasketsComponent
  ]
})
export class BasketsModule { }
