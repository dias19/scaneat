import React from 'react';

import { styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import employeeApi from '~/api/employee/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { EmployeeForm, EmployeeFormData } from './employess-form';

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
    try {
      const { photoUrl, ...body } = data;
      await createEmployee({ restaurantId, ...body }).unwrap();
      onClose();
    } catch (e: any) {
      console.log(e);
      if (e.status === 400) toast.error('Уже существует рабочий с такой почтой');
      else {
        toast.error('Упс, вышла ошибочка');
      }
    }
  };

  const commonProps = {
    onClose,
    onOpen,
    handleAdd,
  };

  return (
    <>
      <EmployeeAddDesktop
        open={open && isDesktop}
        {...commonProps}
      />

      <EmployeeAddMobile
        open={open && !isDesktop}
        {...commonProps}
      />
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
