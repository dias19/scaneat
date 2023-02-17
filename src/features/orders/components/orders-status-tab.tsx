import React, { useState } from 'react';

import { styled, Tab, Tabs } from '@mui/material';

import ordersApi from '~/api/orders/api';

import { ChefStatusesType, Status } from '../type';
import { OrdersList } from './orders-list';

const CHEF_STATUSES: ChefStatusesType = [
  {
    label: 'В ожидании',
    status: 'pending',
  },
  {
    label: 'В процессe',
    status: 'processing',
  },
  {
    label: 'Готовы',
    status: 'ready',
  },
];

export function OrderStatusTab() {
  const [status, setStatus] = useState(CHEF_STATUSES[0].status);

  const currentStatusIndex = CHEF_STATUSES.findIndex((chefStatus) => chefStatus.status === status);

  const nextIndex = (currentStatusIndex + 1) % CHEF_STATUSES.length;

  const [editChefOrder] = ordersApi.endpoints.editChefOrder.useMutation();

  const handleChange = (event: React.SyntheticEvent, newValue: Status) => {
    setStatus(newValue);
  };

  const nextStatus: Status = CHEF_STATUSES[nextIndex].status;

  const editStatus = async (id: number) => {
    await editChefOrder({
      restaurantId: 12,
      orderId: id,
      body: { status: nextStatus },
    });
  };

  return (
    <>
      <TabsStyle value={status} variant="fullWidth" onChange={handleChange}>
        {CHEF_STATUSES.map((orderStatus) => (
          <TabStyle
            label={orderStatus.label}
            value={orderStatus.status}
            key={`orders-tab-${orderStatus.label}`}
          />
        ))}
      </TabsStyle>
      <OrdersList status={status} onSubmit={editStatus} />
    </>
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
