import { Component, Inject, OnInit } from '@angular/core';
import { product } from '@app/shared/interfaces/data.interfaces';
import { DataService } from '@app/shared/services/data.service';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products$:Observable<product[]> = this.dataSvc.products$;


  constructor(private dataSvc: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataSvc.getDataAPI();
  }

  delete(id: string, idProduct: string, typeProduct: string) {
    switch(typeProduct) {
      case 'Car': {
      
        this.dataSvc.deleteCar(id, idProduct);

      } break;
      case 'Shirt': {

        this.dataSvc.deleteShirt(id, idProduct);

      } break;
    }

    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products-list']);
  }

}

