import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/shared/services/data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { car, shirt } from '@shared/interfaces/data.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  public id: string = '';
  public typeProduct: string = 'Car';

  productForm$ = this.dataSvc.productForm$;

  //public productProps: string[] = []

  public form = new FormGroup({})
  public model = {}
  public fields: FormlyFieldConfig[] = 
  [
    {
      key: '_id',
      type: 'input',
      hide: true,
      templateOptions: {
          label: 'id',
          placeholder: 'Ingrese el id del producto',
          required: true,
      },
    },
    {
      key: 'typeProduct',
      type: 'input',
      hide: true,
      templateOptions: {
          label: 'typeProduct',
          placeholder: 'Selecciona el tipo de producto',
          required: true,
      },
    },
    {
        key: 'name',
        type: 'input',
        templateOptions: {
            label: 'Nombre',
            placeholder: 'Ingrese su nombre',
            required: true,
        },
    },
    {
      key: 'color',
      type: 'select',
      templateOptions: {
        label: 'color',
        placeholder: 'Selecciona el color',
        description: 'Selecciona el color',
        required: true,
        options: [
          { value: 'Blue', label: 'Azul'  },
          { value: 'White', label: 'Blanco'  },
          { value: 'Black', label: 'Negro'  },
          { value: 'Yellow', label: 'Amarillo'  },
          { value: 'Green', label: 'Verde'  },
        ],
      },
    },
    {
      key: 'active',
      type: 'toggle',
      templateOptions: {
        label: 'Activo?',
        required: true,
      },
    },
  ];


  


  constructor(private dataSvc: DataService, private route: ActivatedRoute, private router: Router) {
      this.route.params.subscribe((params) => {
        this.id = params["id"];
        this.typeProduct = params["typeProduct"];
      });

      
   }

  ngOnInit(): void {
    
    this.addFieldsByProductType();

    this.getProduct();
    //this.model = this.productForm$;
  }

    

  private getProduct() {
      if (this.id !== 'new') {
        this.dataSvc.getProductByIdAndType(this.id, this.typeProduct);

        
        this.productForm$.forEach((prop) =>  {
            if(prop) {

              switch(this.typeProduct) {
                case 'Car': {
          
                  this.model = {
                      _id: prop["_id"],
                      brand: prop["brand"],
                      model: prop["model"],
                      year: prop["year"],
                      _idProduct: prop["product"]["_id"],
                      name: prop["product"]["name"],
                      color: prop["product"]["color"],
                      typeProduct: prop["product"]["typeProduct"],
                      active: prop["product"]["active"]
                  };
          
                } break;
                case 'Shirt': {
                  this.model = {
                      _id: prop["_id"],
                      length: prop["length"],
                      size: prop["size"],
                      _idProduct: prop["product"]["_id"],
                      name: prop["product"]["name"],
                      color: prop["product"]["color"],
                      typeProduct: prop["product"]["typeProduct"],
                      active: prop["product"]["active"]
                  };
                } break;
              }
              
            }
        });
      }
      else
      {
        this.model = {
          active: true,
          typeProduct: this.typeProduct
        };
      }
  }

  private addFieldsByProductType() {
    switch(this.typeProduct) {
      case 'Car': {

        this.fields = this.fields.concat(
        [
          {
            key: 'brand',
            type: 'select',
            templateOptions: {
              label: 'Marca',
              placeholder: 'Selecciona el la marca',
              description: 'Selecciona el la marca',
              required: true,
              options: [
                { value: 'Audi', label: 'Audi'  },
                { value: 'BMW', label: 'BMW'  },
                { value: 'Bugatti', label: 'Bugatti'  },
                { value: 'Ferrari', label: 'Ferrari'  },
                { value: 'Ford', label: 'Ford'  },
              ],
            },
          },
          {
            key: 'model',
            type: 'input',
            templateOptions: {
                label: 'Modelo',
                placeholder: 'Ingrese el modelo',
                required: true,
            },
          },
          {
            key: 'year',
            type: 'input',
            templateOptions: {
                type: 'number',
                label: 'Año',
                placeholder: 'Ingrese el año',
                required: true,
            }
          },
        ]);

      } break;
      case 'Shirt': {

        this.fields = this.fields.concat(
          [
            {
              key: 'length',
              type: 'input',
              templateOptions: {
                  type: 'number',
                  label: 'largo',
                  placeholder: 'Ingrese el largo',
                  required: true,
              }
            },
            {
              key: 'size',
              type: 'input',
              templateOptions: {
                  type: 'number',
                  label: 'Talla',
                  placeholder: 'Ingrese la talla',
                  required: true,
              }
            },
          ]);

      } break;
    }
  }

  public onSubmit(data: any) {
    //console.log(data)

    switch(this.typeProduct) {
      case 'Car': {

        const _car: car = {
                            _id: data._id,
                            brand: data.brand,
                            model: data.model,
                            year: data.year,
                            product: {
                                      _id: data._idProduct,
                                      name: data.name,
                                      color: data.color,
                                      typeProduct: data.typeProduct,
                                      active: data.active
                                    }
                      
                          }

        if(_car._id) 
          this.dataSvc.updateCar(_car);
        else
          this.dataSvc.createCar(_car);

      } break;
      case 'Shirt': {

        const _shirt: shirt = {
                            _id: data._id,
                            length: data.length,
                            size: data.size,
                            product: {
                                      _id: data._idProduct,
                                      name: data.name,
                                      color: data.color,
                                      typeProduct: data.typeProduct,
                                      active: data.active
                                    }
                      
                          }
        
        if(_shirt._id) 
          this.dataSvc.updateShirt(_shirt);
        else
          this.dataSvc.createShirt(_shirt);
        
      } break;
    }

    //todo: dialog information saved...

    this.router.navigate(['/products-list']);
  }

}
