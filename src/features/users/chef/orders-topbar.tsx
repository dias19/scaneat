import React, { useState } from 'react';

import { styled, Tab, Tabs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { CHEF_STATUSES } from '../contants';

export function ChefOrdersTopbar() {
  const { pathname } = useLocation();

  const [status, setStatus] = useState(pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setStatus(newValue);
  };

  return (
    <TabsStyle
      value={status}
      variant="fullWidth"
      onChange={handleChange}
    >
      {CHEF_STATUSES.map((orderStatus) => (
        <TabStyle
          label={orderStatus.name}
          value={orderStatus.route}
          key={orderStatus.name}
          to={orderStatus.route}
          component={Link}
        />
      ))}
    </TabsStyle>
  );
}

const TabsStyle = styled(Tabs)({
  display: 'grid',
  backgroundColor: 'white',
});

const TabStyle = styled(Tab)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:nth-child(1)': {
    marginRight: 0,
  },
  '&:nth-child(2)': {
    marginRight: 0,
  },
})) as typeof Tab;
