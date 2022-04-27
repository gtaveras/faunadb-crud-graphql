import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsFormRoutingModule } from './products-form-routing.module';
import { ProductsFormComponent } from './products-form.component';

import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ProductsFormComponent
  ],
  imports: [
    CommonModule,
    ProductsFormRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    FormlyMatToggleModule,
    MatButtonModule,
  ]
})
export class ProductsFormModule { }
