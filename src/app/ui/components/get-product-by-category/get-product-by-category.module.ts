import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetProductByCategoryComponent } from './get-product-by-category.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GetProductByCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: GetProductByCategoryComponent }]),
    FormsModule

  ]
})
export class GetProductByCategoryModule { }
