export type Category = {
  name: string;
  description: string;
  isActive: boolean;
  id:number;
  isDeleted: boolean;
};
export type GetCategoriesResponse = Category[];

export type AddCategoryRequest = {
  restaurantId?: number;
  body?: {
    name: string;
    description: string;
    isActive: boolean;
  };
};
export type PatchCategoryRequest={
    categoryId: number,
    body: {
        name:string,
        description: string,
        isActive: boolean,
    }
}
