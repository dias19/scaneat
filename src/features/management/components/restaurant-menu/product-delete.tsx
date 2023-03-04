import React from 'react';

import {
  Box, Button, styled, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import productsApi from '~/api/products/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { RestarauntModifyActions } from '../../types';

type DeleteDishProps = {
  deleteOpen: boolean;
  handleAction: (action: RestarauntModifyActions)=>void,
  title: string;
  productId: number;
};

export function RestaurantProductDelete({
  deleteOpen,
  handleAction,
  title,
  productId,
}: DeleteDishProps) {
  const [deleteProduct] = productsApi.endpoints.deleteProduct.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const isDesktop = useResponsive('up', 'sm');

  const handleDelete = async () => {
    try {
      await deleteProduct({ productId, restaurantId });
      handleAction(null);
    } catch (e) {
      toast.error('Упс, вышла ошибочка');
    }
  };

  const handleOpen = () => {
    handleAction('delete');
  };

  const handleClose = () => {
    handleAction(null);
  };

  if (isDesktop) {
    return (
      <RestaurantProductDeleteDesktop
        title={title}
        deleteOpen={deleteOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        handleDelete={handleDelete}
      />
    );
  }
  return (
    <RestaurantProductDeleteMobile
      deleteOpen={deleteOpen}
      title={title}
      onClose={handleClose}
      onOpen={handleOpen}
      handleDelete={handleDelete}
    />
  );
}

type DeleteProps = Pick<
  DeleteDishProps,
  'title' |
  'deleteOpen'
> & {
  handleDelete: VoidFunction;
  onOpen: VoidFunction,
  onClose: VoidFunction,
};

function RestaurantProductDeleteDesktop({
  deleteOpen,
  onClose,
  onOpen,
  title,
  handleDelete,
}: DeleteProps) {
  return (
    <DialogForm
      open={deleteOpen}
      onClose={onClose}
      onOpen={onOpen}
      title={title}
      hasCloser
      maxWidth="xs"
    >
      <Box>
        <Typography variant="subtitle2">
          Вы уверены что хотите удалить блюдо
          {' '}
          {title}
        </Typography>
        <Typography variant="caption" component="p" color="grey.600" sx={{ mb: 3 }}>
          После удалении вы не сможете вернуть это блюдо
        </Typography>
        <BoxButtonStyle>
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="contained" size="large" onClick={handleDelete} color="error">
            Удалить
          </Button>
        </BoxButtonStyle>
      </Box>
    </DialogForm>
  );
}

function RestaurantProductDeleteMobile({
  deleteOpen,
  onClose,
  onOpen,
  title,
  handleDelete,
}: DeleteProps) {
  return (
    <BottomDrawer
      open={deleteOpen}
      onClose={onClose}
      onOpen={onOpen}
      title={title}
      hasCloser
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="subtitle2">
          Вы уверены что хотите удалить блюдо
          {' '}
          {title}
          ?
        </Typography>
        <Typography variant="caption" component="p" color="grey.600" sx={{ mb: 3 }}>
          После удалении вы не сможете вернуть это блюдо
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="contained" size="large" onClick={handleDelete}>
            Удалить
          </Button>
        </Box>
      </Box>
    </BottomDrawer>
  );
}

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'end',
  },
}));
