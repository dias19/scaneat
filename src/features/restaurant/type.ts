export interface RestaurantForm{
    photoId: number,
    restaurantName: string,
    restaurantPhone: string,
    cityId: number,
    address: string,
    hasTakeAway: boolean,
    hasDelivery: boolean,
}

export interface OwnerForm{
    name: string,
    surname: string,
    email:string,
    phone:string,
}

export type CreateRestaurantForm = OwnerForm & RestaurantForm
