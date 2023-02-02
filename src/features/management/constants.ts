import { PATH_MANAGEMENT } from '~/routes/paths';

export const MANAGEMENT_NAVIGATIONS = [
  {
    name: 'Меню',
    route: PATH_MANAGEMENT.menu,
  },
  {
    name: 'Заказы',
    route: PATH_MANAGEMENT.orders,
  },
  {
    name: 'Настройки',
    route: PATH_MANAGEMENT.settings,
  },
  {
    name: 'Рабочие',
    route: PATH_MANAGEMENT.employees,
  },
];

export const MANAGEMENT_RESTAURANT_STATUS = [
  {
    name: 'В ожидании',
    route: PATH_MANAGEMENT.statusPending,
  },
  {
    name: 'Подтвержденные',
    route: PATH_MANAGEMENT.statusAccepted,
  },
  {
    name: 'Отклоненные',
    route: PATH_MANAGEMENT.statusDeclined,
  },
];
