import React from 'react';

import { Box, CircularProgress } from '@mui/material';

type CircularLoaderProps={
    isLoading: boolean
}

export function CircularLoader({ isLoading }:CircularLoaderProps) {
  return (
    <>
      {isLoading && (
      <Box display="flex" justifyContent="center">
        <CircularProgress sx={{ position: 'absolute', top: '50%' }} />
      </Box>
      )}
      {!isLoading && null}
    </>
  );
}
