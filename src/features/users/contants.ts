import { PATH_USERS } from '~/routes/paths';

export const CHEF_STATUSES = [
  {
    name: 'В ожидании',
    route: PATH_USERS.listOrdersChef,
  },
  {
    name: 'В процессe',
    route: PATH_USERS.inProcessOrdersChef,
  },
  {
    name: 'Готовы',
    route: PATH_USERS.doneOrdersChef,
  },
];
