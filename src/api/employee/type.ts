import { Employee } from '~/features/employees';

export type GetEmployeeResponse = Employee[];

export interface GetEmployeeRequest {
  restaurantId: number;
}

export type CreateEmployeeResponse = void;

export type CreateEmployeeRequest = Pick<
  Employee,
  'email' | 'surname' | 'name' | 'photoId' | 'phone'
> & {
  restaurantId: number;
  isChef: boolean;
  isManager: boolean;
};

export type EditEmployeeResponse = void;

export type EditEmployeeRequest = Pick<Employee, 'name' | 'surname' | 'phone' | 'photoId'> & {
  restaurantId: number;
  isChef: boolean;
  isManager: boolean;
  staffId: number;
};
export type DeleteEmployeeResponse = void;

export interface DeleteEmployeeRequest {
  restaurantId: number;
  staffId: number;
}
