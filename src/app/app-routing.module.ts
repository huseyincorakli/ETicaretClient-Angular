import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';
import { ProductDetailComponent } from './ui/components/products/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent ,canActivate:[AuthGuard]},
      {
        path: 'roles',
        loadChildren: () =>
          import('./admin/components/roles/roles.module').then(
            (module) => module.RolesModule
          ),canActivate:[AuthGuard]
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./admin/components/categories/categories.module').then(
            (module) => module.CategoriesModule
          ),canActivate:[AuthGuard]
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./admin/components/user/user.module').then(
            (module) => module.UserModule
          ),canActivate:[AuthGuard]
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./admin/components/customers/customers.module').then(
            (module) => module.CustomersModule
          ),canActivate:[AuthGuard]
      },
      {
        path: 'authorize-menu',
        loadChildren: () =>
          import('./admin/components/authorize-menu/authorize-menu.module').then(
            (module) => module.AuthorizeMenuModule
          ),canActivate:[AuthGuard]
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./admin/components/products/products.module').then(
            (module) => module.ProductsModule
          ),canActivate:[AuthGuard]
      },
      
      {
        path: 'orders',
        loadChildren: () =>
          import('./admin/components/orders/orders.module').then(
            (module) => module.OrdersModule
          ),canActivate:[AuthGuard]
      },
     
    ],canActivate:[AuthGuard]
    
  },
  { path: '', component: HomeComponent },
  {
    path: 'baskets',
    loadChildren: () =>
      import('./ui/components/baskets/baskets.module').then(
        (module) => module.BasketsModule
      ),
  },
  {
    path: 'my-orders',
    loadChildren: () =>
      import('./ui/components/my-orders/my-orders.module').then(
        (module) => module.MyOrdersModule
      ),
  },
  {
    path: 'checkouts',
    loadChildren: () =>
      import('./ui/components/checkout/checkout.module').then(
        (module) => module.CheckoutModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./ui/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
        path: 'products/detail/:productId',
        component:ProductDetailComponent,
        canActivate:[AuthGuard]
      },
  {
    path: 'products-by-category/:categoryId',
    loadChildren: () =>
      import('./ui/components/get-product-by-category/get-product-by-category.module').then(
        (module) => module.GetProductByCategoryModule
      ),
  },
  {
    path: 'password-reset',
    loadChildren: () =>
      import('./ui/components/password-reset/password-reset.module').then(
        (module) => module.PasswordResetModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./ui/components/settings/settings.module').then(
        (module) => module.SettingsModule
      ),
  },
  {
    path: 'update-password/:userId/:resetToken',
    loadChildren: () =>
      import('./ui/components/update-password/update-password.module').then(
        (module) => module.UpdatePasswordModule
      ),
  },
  {
    path: 'products/:pageNo',
    loadChildren: () =>
      import('./ui/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./ui/components/register/register.module').then(
        (module) => module.RegisterModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./ui/components/login/login.module').then(
        (module) => module.LoginModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
