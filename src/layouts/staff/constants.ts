import { PATH_USERS } from '~/routes/paths';

export const CHEF_NAVIGATION_ITEMS = [
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
