import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { CategoriesModule } from './components/categories/categories.module';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,ComponentsModule
  ],exports:[
    ComponentsModule,
    CategoriesModule
  ]
})
export class UiModule { }
