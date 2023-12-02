import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { BestSellingProductsComponent } from './best-selling-products/best-selling-products.component';
import { LeastStockedProductsComponent } from './least-stocked-products/least-stocked-products.component';
import { WeeklySalesComponent } from './weekly-sales/weekly-sales.component';
import { UnfulfilledOrdersComponent } from './unfulfilled-orders/unfulfilled-orders.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BestSellingProductsComponent,
    LeastStockedProductsComponent,
    WeeklySalesComponent,
    UnfulfilledOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:"",component:DashboardComponent
    }])
  ]
})
export class DashboardModule { }
