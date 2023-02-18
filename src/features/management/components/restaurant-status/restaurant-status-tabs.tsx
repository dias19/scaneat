import React from 'react';

import {
  Box, styled, Tab, Tabs,
} from '@mui/material';
import { Outlet } from 'react-router-dom';

import { HEADER } from '~/layouts/management/constants';

import { RestaurantStatus } from '../../types';
import { RestaurantStatusList } from './restaurant-status-list';

type ManagerStatuses={
  label:string,
  name: RestaurantStatus
}[]

const MANAGER_STATUSES: ManagerStatuses = [
  {
    label: 'В ожидании',
    name: 'pending',
  },
  {
    label: 'Подтвержденные',
    name: 'accepted',
  },
  {
    label: 'Отклоненные',
    name: 'rejected',
  },
];

export function RestaurantStatusTabs() {
  const [value, setValue] = React.useState(MANAGER_STATUSES[0].name);

  const handleChange = (event: React.SyntheticEvent, newValue: RestaurantStatus) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <TabsStyle value={value} onChange={handleChange} variant="fullWidth">
          {MANAGER_STATUSES.map((status) => (
            <TabStyle
              key={`restaurant-status-${status.label}`}
              value={status.name}
              label={status.label}
            />
          ))}
        </TabsStyle>
        <RestaurantStatusList status={value} />
      </Box>
      <Outlet />
    </>
  );
}

const TabsStyle = styled(Tabs)(({ theme }) => ({
  backgroundColor: 'white',
  width: '100%',
  display: 'grid',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  top: HEADER.HEADER_HEIGHT,
}));

const TabStyle = styled(Tab)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:nth-child(1)': {
    marginRight: 0,
  },
  '&:nth-child(2)': {
    marginRight: 0,
  },
  fontSize: 12,
  minHeight: HEADER.HEADER_HEIGHT,
})) as typeof Tab;
