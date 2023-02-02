export type Restaurant={
    name: string,
    slug: string,
    phone: string,
    cityId: 0,
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
export type PostPhotoResponse={
    photo: string,
    id: string,
    originalUrl: string,
}
