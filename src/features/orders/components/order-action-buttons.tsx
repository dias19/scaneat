import React from 'react';

import { Button } from '@mui/material';

type ActionButtonProps={
    onOpen: VoidFunction,
    onClose:VoidFunction,
    onSubmit?: VoidFunction,
    buttonTitle?: string,
}

export function OrderActionButtons({
  onClose, onOpen, onSubmit, buttonTitle,
}:ActionButtonProps) {
  const handleSubmit = () => {
    onSubmit?.();
    onOpen();
  };

  return (
    <>
      <Button variant="outlined" size="large" onClick={onClose}>
        Назад
      </Button>
      <Button variant="contained" size="large" onClick={handleSubmit}>
        {buttonTitle}
      </Button>
    </>
  );
}
