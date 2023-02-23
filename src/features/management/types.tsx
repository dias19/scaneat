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

export type RestaurantStatus='pending' | 'accepted' | 'rejected'

type Actions='edit' | 'delete'

export type RestarauntModifyActions= Actions | null

export type Employee={
  photoId: number,
  name: string,
  surname: string,
  phone: string,
  role: string,
  photoUrl:string,
  email:string,
  id: number,
}
export interface EmployeeFormData{
  name: string,
  surname: string,
  email: string,
  phone:string,
  photoUrl: string,
  isManager: boolean,
  role:string,
  isChef: boolean,
  photoId: number
}

export interface ManagementDetailsNavigation{
  name: string,
  route: (id?: number | undefined) => string;
}
