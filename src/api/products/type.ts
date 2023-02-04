export interface Product {
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
  isDeleted: boolean;
}
export type GetProductsResponse = Product[];

export interface AddProductRequest {
  name: string;
  description: string;
  price: number;
  photoId: number;
  restaurantId: number;
  categoryId: number;
}

export type EditProductRequest = Omit<AddProductRequest, 'restaurantId' | 'categoryId'> & {
  productId: number;
  restaurantId: number;
};

export interface GetProductRequest {
  restaurantId: number;
  categoryId: number;
}

export interface DeleteProductRequest {
  restaurantId: number;
  productId: number;
}

export type DeleteProductResponse = void;

export type EditProductResponse = void;

export interface AddProductResponse {
  categoryId: number;
  createdAt: string;
  description: string;
  id: number;
  isDeleted: boolean;
  name: string;
  photoId: number;
  price: number;
  restaurantId: number;
  updatedAt: string;
}
