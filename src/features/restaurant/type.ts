export interface RestaurantForm {
  restaurant: {
    photoId: number;
    photoUrl: string;
    name: string;
    phone: string;
    cityId: number;
    address: string;
    hasTakeAway: boolean;
    hasDelivery: boolean;
  };
}

export interface OwnerForm {
  restaurantOwner: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
}

export type CreateRestaurantForm = OwnerForm & RestaurantForm;
