import { Employee } from '~/features/management';

export type GetEmployeeResponse = Employee[];

export interface GetEmployeeRequest {
  restaurantId: number;
}

export type CreateEmployeeResponse = void;

export interface CreateEmployeeRequest {
  restaurantId: number;
  body: {
    photoId: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: string
  };
}

export type EditEmployeeResponse=void

export interface EditEmployeeRequest{
    restaurantId: number,
    staffId: number,
    body:{
        photoId: number,
        name: string,
        surname: string,
        phone: string
    }
}

export type DeleteEmployeeResponse=void

export interface DeleteEmployeeRequest{
    restaurantId: number,
    staffId: number
}
