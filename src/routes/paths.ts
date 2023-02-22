function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '';
const ROOTS_MANAGEMENT = '/management';
const ROOTS_USER = '/user';
const ROOTS_RESTAURANT = '/restaurant';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_MANAGEMENT = {
  root: ROOTS_MANAGEMENT,
  myRestaurants: path(ROOTS_MANAGEMENT, '/restaurants'),
  profile: path(ROOTS_MANAGEMENT, '/profile'),
  addRestaurant: path(ROOTS_MANAGEMENT, '/add'),
  restaurantDetails: (slug?: string) => path(ROOTS_MANAGEMENT, `/restaurants/${slug}`),
  menu: (id?: number) => path(ROOTS_MANAGEMENT, `/restaurants/${id}/menu`),
  orders: (id?: number) => path(ROOTS_MANAGEMENT, `/restaurants/${id}/orders`),
  settings: (id?: number) => path(ROOTS_MANAGEMENT, `/restaurants/${id}/settings`),
  employees: (id?: number) => path(ROOTS_MANAGEMENT, `/restaurants/${id}/employees`),
  menuItems: (restaurantId?:number, categoryId?:number) => path(
    ROOTS_MANAGEMENT,
    `/restaurants/${restaurantId}/menu/${categoryId}`,
  ),
  restaurantStatuses: path(ROOTS_MANAGEMENT, '/restaurants/status'),
};

export const PATH_PAGE = {
  home: '/',
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_RESTAURANTS = {
  createRestaurant: path(ROOTS_RESTAURANT, '/create-restaurant'),
  successfulCreation: path(ROOTS_RESTAURANT, '/creation-successful'),
  chefsOrders: (restaurantId: number) => path(ROOTS_RESTAURANT, `/${restaurantId}/chef-orders`),
};

export const PATH_USERS = {
  profile: path(ROOTS_USER, '/profile'),
};
