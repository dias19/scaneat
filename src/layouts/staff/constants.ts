import { PATH_RESTAURANTS, PATH_USERS } from '~/routes/paths';

export const CHEF_NAVIGATION_ITEMS = [
  {
    activeIcon: 'material-symbols:list-alt-rounded',
    defaultIcon: 'material-symbols:list-alt-outline',
    // unable to get restaraunt id from useParams when being on different page
    // maybe store the restaraunt id in state after login
    route: PATH_RESTAURANTS.chefsOrders(12),
  },
  {
    activeIcon: 'material-symbols:person-rounded',
    defaultIcon: 'material-symbols:person-outline-rounded',
    name: 'Профиль',
    route: PATH_USERS.profile,
  },
];
