import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule  ,
    RouterModule
  ],
  exports:[
    CategoriesComponent
  ]
})
export class CategoriesModule { }
