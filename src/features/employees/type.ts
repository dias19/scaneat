type Roles='chef' | 'manager'

export type Employee={
    photoId: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    originalUrl:string,
    id: number,
    restaurantStaffId: number,
    roles: Roles[],
  }
