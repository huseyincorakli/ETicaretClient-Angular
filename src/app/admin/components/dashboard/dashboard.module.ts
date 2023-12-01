import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { BestSellingProductsComponent } from './best-selling-products/best-selling-products.component';
import { LeastStockedProductsComponent } from './least-stocked-products/least-stocked-products.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BestSellingProductsComponent,
    LeastStockedProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:"",component:DashboardComponent
    }])
  ]
})
export class DashboardModule { }
