export interface Restaurant {
  name: string;
  slug: string;
  phone: string;
  cityId: number;
  address: string;
  hasTakeAway: boolean;
  hasDelivery: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  rating: string;
  photoId: number;
  verificationStatus: boolean;
  originalUrl: string;
}

export type GetRestaurantsResponse = Restaurant[];

export type GetRestaurantResponse = Restaurant[];

export type VerifyRestaurantResponse = Restaurant;

export type RejectRestaurantResponse = Restaurant;

export type GetRestaurantsRequest = string;

export type GetRestaurantRequest = string;

export type GetRestaurantQR = string;

export type VerifyRestaurantRequest = number;

export type RejectRestaurantRequest = number;

export interface CreateRestaurantRequest {
  restaurant: {
    name: string;
    slug: string;
    phone: string;
    cityId: number;
    address: string;
    hasTakeAway: boolean;
    hasDelivery: boolean;
    photoId: number;
  };
  restaurantOwner: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
}

export type CreateRestaurantResponse=Restaurant[]
