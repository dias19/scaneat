import { Category } from '~/features/management';

export type GetCategoriesResponse = Category[];

export interface AddCategoryRequest {
  restaurantId: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface EditCategoryRequest{
  categoryId: number;
  restaurantId: number;
  name: string;
  description: string;
  isActive: boolean;
}

export type DeleteCategoryResponse = void

export type EditCategoryResponse = void

export type DeleteCategoryRequest=Pick<EditCategoryRequest, 'categoryId' | 'restaurantId'>
