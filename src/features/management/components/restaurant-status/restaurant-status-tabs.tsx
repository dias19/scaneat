import React from 'react';

import {
  Box, Container, styled, Tab, Tabs,
} from '@mui/material';

import { useResponsive } from '~/hooks/useResponsive';
import { HEADER } from '~/layouts/management/constants';

import { RestaurantStatus } from '../../types';
import { RestaurantStatusList } from './restaurant-status-list';

type ManagerStatuses = {
  label: string;
  name: RestaurantStatus;
};

const MANAGER_STATUSES: ManagerStatuses[] = [
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
  const [status, setValue] = React.useState(MANAGER_STATUSES[0].name);

  const handleChange = (event: React.SyntheticEvent, newValue: RestaurantStatus) => {
    setValue(newValue);
  };

  const isDesktop = useResponsive('up', 'sm');

  return (
    <Box sx={{ width: '100%' }}>
      {isDesktop && <TabsDesktop status={status} handleChange={handleChange} />}
      {!isDesktop && <TabsMobile status={status} handleChange={handleChange} />}
    </Box>
  );
}

type TabsProps = {
  status: RestaurantStatus;
  handleChange: (event: React.SyntheticEvent, newValue: RestaurantStatus) => void;
};

function TabsDesktop({ status, handleChange }: TabsProps) {
  return (
    <Container>
      <Box display="flex">
        <TabsStyle
          value={status}
          onChange={handleChange}
          variant="standard"
          orientation="vertical"
          TabIndicatorProps={{
            sx: { display: 'none' },
          }}
        >
          {MANAGER_STATUSES.map((restaurantStatus) => (
            <TabStyle
              key={`restaurant-status-${restaurantStatus.label}`}
              value={restaurantStatus.name}
              label={restaurantStatus.label}
            />
          ))}
        </TabsStyle>
        <RestaurantStatusList status={status} />
      </Box>
    </Container>
  );
}

function TabsMobile({ status, handleChange }: TabsProps) {
  return (
    <>
      <TabsStyle value={status} onChange={handleChange} variant="fullWidth">
        {MANAGER_STATUSES.map((restaurantStatus) => (
          <TabStyle
            key={`restaurant-status-${restaurantStatus.label}`}
            value={restaurantStatus.name}
            label={restaurantStatus.label}
          />
        ))}
      </TabsStyle>
      <RestaurantStatusList status={status} />
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
  [theme.breakpoints.up('sm')]: {
    position: 'relative',
    backgroundColor: 'inherit',
    width: 'auto',
    marginRight: theme.spacing(7),
  },
})) as typeof Tabs;

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
  [theme.breakpoints.up('sm')]: {
    fontSize: 16,
  },
  '&.Mui-scroll': {
    color: 'green',
  },
})) as typeof Tab;
