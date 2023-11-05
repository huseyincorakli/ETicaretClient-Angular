import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { CategoriesModule } from './categories/categories.module';
import { GetProductByCategoryModule } from './get-product-by-category/get-product-by-category.module';
import { SettingsModule } from './settings/settings.module';




@NgModule({
  declarations: [
  
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    BasketsModule,
    HomeModule,
    RegisterModule,
    // LoginModule
    PasswordResetModule,
    UpdatePasswordModule,
    CategoriesModule,
    GetProductByCategoryModule,SettingsModule
  ],
  exports: [
    BasketsModule,
    CategoriesModule,
  ]
})
export class ComponentsModule { }
