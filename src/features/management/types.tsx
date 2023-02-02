export type ProductFormData = {
    name: string;
    price: number;
    description: string;
    photoId: number;
 };
export type ProductData={
    name: string;
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  price: string;
  restaurantId: number;
  categoryId: number;
  originalUrl: string;
  photoId: number;
}
export type Category = {
    name: string;
    description: string;
    isActive: boolean;
    id:number;
    isDeleted: boolean;
  };

export type CategoryFormData={
    name:string,
    description: string
}
