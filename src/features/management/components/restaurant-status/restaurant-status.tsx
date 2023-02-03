import React from 'react';

import {
  Box, styled, Tab, Tabs,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import { MANAGEMENT_RESTAURANT_STATUS } from '../../constants';

export function RestaurantStatus() {
  const [value, setValue] = React.useState('В ожидании');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <TabsStyle value={value} onChange={handleChange} variant="fullWidth">
          {MANAGEMENT_RESTAURANT_STATUS.map((status) => (
            <Tab
              key={`restaurant-status-${status.name}`}
              value={status.name}
              label={status.name}
              to={status.route}
              component={Link}
              sx={{
                padding: 2,
                '&:nth-child(1)': {
                  marginRight: 0,
                },
                '&:nth-child(2)': {
                  marginRight: 0,
                },
                fontSize: 12,
              }}
            />
          ))}
        </TabsStyle>
      </Box>
      <Outlet />
    </>
  );
}
const TabsStyle = styled(Tabs)({
  color: 'white',
  maxWidth: '100%',
  display: 'grid',
});
