import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CommentsComponent } from './product-detail/comments/comments.component';
import { CreateComponent } from './product-detail/comments/create/create.component';
@NgModule({
  declarations: [ProductsComponent, ListComponent, ProductDetailComponent, CommentsComponent, CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent },
    { path: 'detail/:productId', component: ProductDetailComponent }
    ]),
    
    FormsModule
  ],
})
export class ProductsModule {}
