export interface DataResponseProduct {
    allCars: allCars;
    allShirt: allShirt;
}

export interface DataResponseCar {
    findCarByID: car;
}

export interface DataResponseShirt {
    findShirtByID: shirt;
}

export interface product {
    
    _id: string
    product: bodyProduct
}

export interface bodyProduct {
    
    _id: string
    name: string
    color: string
    typeProduct: string
    active: boolean
}

export interface car {
    _id: string
    product: bodyProduct
	brand: string
	model: string
    year: number
}

export interface shirt {
    _id: string
    product: bodyProduct
	length: number
	size: number
}

export interface allProduct {
    data : product[]
}

export interface allCars {
    data : product[]
}

export interface allShirt {
    data : product[]
}