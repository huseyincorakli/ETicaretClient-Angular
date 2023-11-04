import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetProductByCategoryComponent } from './get-product-by-category.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GetProductByCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: GetProductByCategoryComponent }]),

  ]
})
export class GetProductByCategoryModule { }
