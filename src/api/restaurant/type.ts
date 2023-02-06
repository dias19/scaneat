export interface Restaurant{
    name: string,
    slug: string,
    phone: string,
    cityId: number,
    address: string,
    hasTakeAway: boolean,
    hasDelivery: boolean,
    id: number,
    createdAt: string,
    updatedAt: string,
    isActive: boolean,
    rating: string,
    photoId: number,
    verificationStatus: boolean,
    originalUrl:string,
}

export type GetRestaurantsResponse=Restaurant[]

export interface PostPhotoResponse{
    photo: string,
    id: string,
    originalUrl: string,
}

export type GetRestaurantResponse=Restaurant[]

export type VerifyRestaurantResponse=Restaurant

export type RejectRestaurantResponse=Restaurant

export type GetRestaurantsRequest=string

export type GetRestaurantRequest=string

export type PostPhotoRequest=FormData

export type GetRestaurantQR=string

export type VerifyRestaurantRequest=number

export type RejectRestaurantRequest=number
