import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, take, tap } from 'rxjs';
import { car, DataResponseCar, DataResponseProduct, DataResponseShirt, product, shirt } from '../interfaces/data.interfaces';

//queries
const QUERY_PRODUCTS = gql`{
                                allCars {
                                  data { 
                                  _id
                                  product {
                                    _id
                                    name
                                    color
                                    typeProduct
                                    active
                                  }
                                }
                              },
                              allShirt {
                                data {
                                  _id
                                  product {
                                    _id
                                    name
                                    color
                                    typeProduct
                                    active
                                  }
                                }
                              }
                              }
                            `;

const QUERY_CAR = gql`query GetCar($Id: ID!) {
                        findCarByID(id: $Id) {
                            _id
                            brand
                            model
                            year
                            product {
                              _id
                              name
                              color
                              typeProduct
                              active
                              usrgrab
                              usrmodi
                            }
                      }
                    }
                  `;

const QUERY_SHIRT = gql`query GetShirt($Id: ID!) {
                        findShirtByID(id: $Id) {
                            _id
                            length
                            size
                            product {
                              _id
                              name
                              color
                              typeProduct
                              active
                              usrgrab
                              usrmodi
                            }
                      }
                    }
                    `;

//Create
const MUTATION_CREATE_CAR = gql`
mutation createCar($name: String!,
                  $color: String!,
                  $typeProduct: String!,
                  $active: Boolean,
                  $usrgrab: String!,
                  $brand: String!,
                  $model: String!,
                  $year: Int!) {
  createCar(
    data: {
      product: {
        create: {
          name: $name
          color: $color
          typeProduct: $typeProduct
          active: $active
          usrgrab: $usrgrab
        }
      }
      brand: $brand
      model: $model
      year: $year
    }
  ) {
    _id
  }
}
`;

const MUTATION_CREATE_SHIRT = gql`
mutation createShirt($name: String!,
                      $color: String!,
                      $typeProduct: String!,
                      $active: Boolean,
                      $usrgrab: String!,
                      $length: Float!,
                      $size: Float!) {
  createShirt(
    data: {
      product: {
        create: {
          name: $name
          color: $color
          typeProduct: $typeProduct
          active: $active
          usrgrab: $usrgrab
        }
      }
      length: $length
      size: $size
    }
  ) {
    _id
  }
}
`;

//Update
const MUTATION_UPDATE_CAR = gql`
mutation updateCar($_id: ID!,
                   $_idProduct: ID!,
                   $name: String!,
                   $color: String!,
                   $typeProduct: String!,
                   $active: Boolean,
                   $usrgrab: String!,
                   $usrmodi: String!,
                   $brand: String!,
                   $model: String!,
                   $year: Int!) {
  updateCar(
    id: $_id
    data: {
      brand: $brand
      model: $model
      year: $year
    }
  ) {
    _id
  }
  updateProduct(
    id: $_idProduct
    data: {
      name: $name
      color: $color
      typeProduct: $typeProduct
      active: $active
      usrgrab: $usrgrab
      usrmodi: $usrmodi
    }
  ) {
    _id
  }
}
`;

const MUTATION_UPDATE_SHIRT = gql`
mutation updateShirt($_id: ID!,
                    $_idProduct: ID!,
                    $name: String!,
                    $color: String!,
                    $typeProduct: String!,
                    $active: Boolean,
                    $usrgrab: String!,
                    $usrmodi: String!,
                    $length: Float!,
                    $size: Float!) {
  updateShirt(
    id: $_id
    data: {
      length: $length
      size: $size
    }
  ) {
    _id
  }
  updateProduct(
    id: $_idProduct
    data: {
      name: $name
      color: $color
      typeProduct: $typeProduct
      active: $active
      usrgrab: $usrgrab
      usrmodi: $usrmodi
    }
  ) {
    _id
  }
}
`;

//Delete
const MUTATION_DELETE_CAR= gql`
mutation deleteCar($id: ID!, $_idProduct: ID!) {
  deleteCar(id: $id)
  {
    _id
  }
  deleteProduct(id: $_idProduct)
  {
    _id
  }
}
`;

const MUTATION_DELETE_SHIRT = gql`
mutation deleteShirt($id: ID!, $_idProduct: ID!) {
  deleteShirt(id: $id)
  {
    _id
  }
  deleteProduct(id: $_idProduct)
  {
    _id
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private productsSubject = new BehaviorSubject<product[]>([]);
  private carsSubject = new BehaviorSubject<car[]>([]);
  private shirtsSubject = new BehaviorSubject<shirt[]>([]);
  private productFormSubject = new BehaviorSubject<any>(null);
  
  products$ = this.productsSubject.asObservable();
  cars$ = this.carsSubject.asObservable();
  shirts$ = this.shirtsSubject.asObservable();
  productForm$ = this.productFormSubject.asObservable();

  constructor(private apollo: Apollo) {
    
   }
  
  //----------------------- query methods ----------------------------/
  getDataAPI():void {

    this.apollo.watchQuery<DataResponseProduct>({
      query: QUERY_PRODUCTS
    }).valueChanges.pipe(
      take(1),
      tap(({data}) => {
        
        const { allCars, allShirt } = data;
        this.productsSubject.next(allCars.data.concat(allShirt.data));

      })
    ).subscribe();
  }
  
  getProductByIdAndType(id: string, type: string):void {

    switch(type) {
      case 'Car': {
        this.apollo.watchQuery<DataResponseCar>({
          query: QUERY_CAR,
          variables: {
            Id: id,
          }
        }).valueChanges.pipe(
          take(1),
          tap(({data}) => {
            
            console.log(data);

            const { findCarByID } = data;
            this.productFormSubject.next(findCarByID);
    
          })
        ).subscribe();

      } break;
      case 'Shirt': {

        this.apollo.watchQuery<DataResponseShirt>({
          query: QUERY_SHIRT,
          variables: {
            Id: id,
          }
        }).valueChanges.pipe(
          take(1),
          tap(({data}) => {
            
            const { findShirtByID } = data;
            this.productFormSubject.next(findShirtByID);
    
          })
        ).subscribe();

      }
    }
    
  }

  //----------------------- create methods ----------------------------/
  createCar(data: car): void {
    this.apollo.mutate({
      mutation: MUTATION_CREATE_CAR,
      variables: {
        name: data.product.name,
        color: data.product.color,
        typeProduct: data.product.typeProduct,
        active: data.product.active,
        usrgrab: `gregory-26/04/2022-12:57`,
        brand: data.brand,
        model: data.model,
        year: data.year
      }
    }).subscribe({
      next: (v) => console.log('got data', v),
      error: (e) => console.log(`there was an error creating ${data.product.typeProduct}`, e),
      complete: () => console.info('complete') 
    });
  }

  createShirt(data: shirt): void {
    this.apollo.mutate({
      mutation: MUTATION_CREATE_SHIRT,
      variables: {
        name: data.product.name,
        color: data.product.color,
        typeProduct: data.product.typeProduct,
        active: data.product.active,
        usrgrab: `gregory-26/04/2022-12:57`,
        length: data.length,
        size: data.size
      }
    }).subscribe({
      next: (v) => console.log('got data', v),
      error: (e) => console.log(`there was an error creating ${data.product.typeProduct}`, e),
      complete: () => console.info('complete') 
    });
  }

  //----------------------- update methods ----------------------------/
  updateCar(data: car): void {
    this.apollo.mutate({
      mutation: MUTATION_UPDATE_CAR,
      variables: {
        _id: data._id,
        _idProduct: data.product._id,
        name: data.product.name,
        color: data.product.color,
        typeProduct: data.product.typeProduct,
        active: data.product.active,
        usrgrab: `gregory-26/04/2022-12:57`,
        usrmodi: `gregory-26/04/2022-12:57`,
        brand: data.brand,
        model: data.model,
        year: data.year
      }
    }).subscribe({
      next: (v) => console.log('got data', v),
      error: (e) => console.log(`there was an error creating ${data.product.typeProduct}`, e),
      complete: () => console.info('complete') 
    });
  }

  updateShirt(data: shirt): void {
    this.apollo.mutate({
      mutation: MUTATION_UPDATE_SHIRT,
      variables: {
        _id: data._id,
        _idProduct: data.product._id,
        name: data.product.name,
        color: data.product.color,
        typeProduct: data.product.typeProduct,
        active: data.product.active,
        usrgrab: `gregory-26/04/2022-12:57`,
        usrmodi: `gregory-26/04/2022-12:57`,
        length: data.length,
        size: data.size
      }
    }).subscribe({
      next: (v) => console.log('got data', v),
      error: (e) => console.log(`there was an error creating ${data.product.typeProduct}`, e),
      complete: () => console.info('complete') 
    });
  }

  //----------------------- delete methods ----------------------------/
  deleteCar(id: string, idProduct: string): void {
    this.apollo.mutate({
      mutation: MUTATION_DELETE_CAR,
      variables: {
        id,
        _idProduct: idProduct,
      }
    }).subscribe({
      next: (v) => console.log('got data', v),
      error: (e) => console.log(`there was an error deleting the car`, e),
      complete: () => console.info('complete') 
    });
  }

  deleteShirt(id: string, idProduct: string): void {
    this.apollo.mutate({
      mutation: MUTATION_DELETE_SHIRT,
      variables: {
        id,
        _idProduct: idProduct,
      }
    }).subscribe({
      next: (v) => console.log('got data', v),
      error: (e) => console.log(`there was an error deleting the car`, e),
      complete: () => console.info('complete') 
    });
  }

}
