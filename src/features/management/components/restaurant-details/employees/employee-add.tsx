import React from 'react';

import { styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import employeeApi from '~/api/employee/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { EmployeeFormData } from '../../../types';
import { EmployeeForm } from './employess-form';

type Props = {
  open: boolean;
  onOpen: VoidFunction,
  onClose: VoidFunction,
};

export function EmployeeAdd({ open, onOpen, onClose }: Props) {
  const isDesktop = useResponsive('up', 'sm');

  const [createEmployee] = employeeApi.endpoints.createEmployee.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const handleAdd = async (data: EmployeeFormData) => {
    const { photoUrl, ...body } = data;
    try {
      await createEmployee({ restaurantId, body });
      onClose();
    } catch (e) {
      toast.error('Упс, вышла ошибочка');
    }
  };

  return (
    <>
      {
      isDesktop
      && (
        <EmployeeAddDesktop
          onClose={onClose}
          onOpen={onOpen}
          open={open}
          handleAdd={handleAdd}
        />
      )
      }
      {
        !isDesktop && (
          <EmployeeAddMobile
            onClose={onClose}
            onOpen={onOpen}
            open={open}
            handleAdd={handleAdd}
          />
        )
      }
    </>
  );
}

type EmployeeAddProps=Props & {
  handleAdd: (data: EmployeeFormData) => void
}

function EmployeeAddDesktop({
  open, onOpen, onClose, handleAdd,
}: EmployeeAddProps) {
  return (
    <DialogForm
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      title="Добавить рабочего"
      hasCloser
    >
      <EmployeeForm
        buttonTitle="Добавить рабочего"
        onCloseForm={onClose}
        onSubmit={handleAdd}
      />
    </DialogForm>
  );
}

function EmployeeAddMobile({
  open, onOpen, onClose, handleAdd,
}: EmployeeAddProps) {
  return (
    <BottomDrawerStyle
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      title="Добавить рабочего"
      hasCloser
    >
      <EmployeeForm
        buttonTitle="Добавить"
        onCloseForm={onClose}
        onSubmit={handleAdd}
      />
    </BottomDrawerStyle>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
