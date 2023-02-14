import { PATH_USERS } from '~/routes/paths';

export const NAVIGATION_BUTTONS_CHEF = [
  {
    activeIcon: 'material-symbols:list-alt-rounded',
    defaultIcon: 'material-symbols:list-alt-outline',
    route: PATH_USERS.listOrdersChef,
  },
  {
    activeIcon: 'material-symbols:person-rounded',
    defaultIcon: 'material-symbols:person-outline-rounded',
    name: 'Профиль',
    route: PATH_USERS.profile,
  },
];
