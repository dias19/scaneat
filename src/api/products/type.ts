export type Product = {
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
};
export type GetProductsResponse = Product[];
export type AddProductRequest = {
  body: {
    name: string;
    description: string;
    price: number;
    photoId: number;
  },
  restaurantId: number,
  categoryId: number,
};
export type EditProductRequest=Pick<AddProductRequest, 'body'> & {
    productId: number
}
