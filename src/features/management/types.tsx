export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  photoId: number;
  unitPrice: number,
  photoUrl: string;
}

export interface Product {
  name: string;
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  restaurantId: number;
  categoryId: number;
  originalUrl: string;
  photoId: number;
  isDeleted: boolean;
  unitPrice: number,
}

export interface Category {
  name: string;
  description: string;
  isActive: boolean;
  id: number;
  isDeleted: boolean;
  numberOfProducts: string,
}

export interface CategoryFormData {
  name: string;
  description: string;
}
