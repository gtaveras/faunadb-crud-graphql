import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'products-list', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
  { path: 'products', loadChildren: () => import('./components/pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'products-list', loadChildren: () => import('./components/pages/products/products-list/products-list.module').then(m => m.ProductsListModule) },
  { path: 'products-form/:id/:typeProduct', loadChildren: () => import('./components/pages/products/products-form/products-form.module').then(m => m.ProductsFormModule) },
  { path: '**', loadChildren: () => import('./components/pages/notFound/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
