import React, { useState } from 'react';

import { styled, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';

import ordersApi from '~/api/orders/api';
import { HEADER } from '~/layouts/management/constants';

import { OrderStatus } from '../type';
import { OrdersList } from './orders-list';

type ChefStatusesType={
  label: string,
  status: OrderStatus
}[]

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

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const currentStatusIndex = CHEF_STATUSES.findIndex((chefStatus) => chefStatus.status === status);

  const nextIndex = (currentStatusIndex + 1) % CHEF_STATUSES.length;

  const [editChefOrder] = ordersApi.endpoints.editChefOrder.useMutation();

  const handleChange = (event: React.SyntheticEvent, newValue: OrderStatus) => {
    setStatus(newValue);
  };

  const nextStatus: OrderStatus = CHEF_STATUSES[nextIndex].status;

  const editStatus = async (id: number) => {
    await editChefOrder({
      restaurantId,
      orderId: id,
      status: nextStatus,
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
      <OrdersList
        status={status}
        onSubmit={editStatus}
        restaurantId={restaurantId}
      />
    </>
  );
}

const TabsStyle = styled(Tabs)(({ theme }) => ({
  display: 'grid',
  backgroundColor: 'white',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  width: '100%',
  top: HEADER.HEADER_HEIGHT,
}));

const TabStyle = styled(Tab)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: HEADER.HEADER_HEIGHT,
  '&:nth-child(1)': {
    marginRight: 0,
  },
  '&:nth-child(2)': {
    marginRight: 0,
  },
})) as typeof Tab;
