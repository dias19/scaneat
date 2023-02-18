import React from 'react';

import { Button } from '@mui/material';

type ActionButtonProps={
    setOpen: (state: boolean) => void,
    onSubmit?: VoidFunction,
    buttonTitle?: string,
}

export function OrderActionButtons({ setOpen, onSubmit, buttonTitle }:ActionButtonProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit?.();
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" size="large" onClick={handleClose}>
        Назад
      </Button>
      <Button variant="contained" size="large" onClick={handleSubmit}>
        {buttonTitle}
      </Button>
    </>
  );
}
