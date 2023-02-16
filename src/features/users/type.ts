export type ProductsSelected={
    name: string,
    price: string,
    unitPrice: string,
    quantity: number,
}

export type Order ={
    address: string,
    addressDetails: string,
    description: string,
    id: number,
    products: ProductsSelected[],
    profit: string,
    status: string,
    total:string,
    type:string,
}
