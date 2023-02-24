import { Employee, EmployeeFormData } from '~/features/management';

export type GetEmployeeResponse = Employee[];

export interface GetEmployeeRequest {
  restaurantId: number;
}

export type CreateEmployeeResponse = void;

export interface CreateEmployeeRequest {
  restaurantId: number;
  body: Pick<
    EmployeeFormData,
    'email' | 'isChef' | 'isManager' | 'photoId' | 'name' | 'phone' | 'surname'
  >;
}

export type EditEmployeeResponse = void;

export interface EditEmployeeRequest {
  restaurantId: number;
  staffId: number;
  body: Pick<EmployeeFormData, 'isChef' | 'isManager' | 'photoId' | 'name' | 'phone' | 'surname'>;
}

export type DeleteEmployeeResponse = void;

export interface DeleteEmployeeRequest {
  restaurantId: number;
  staffId: number;
}
