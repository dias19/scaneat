import React from 'react';

import { Typography, Box, styled } from '@mui/material';

export function RestaurantSales() {
  const sales = [
    {
      period: 'За сегодня',
      sold: 61,
    },
    {
      period: 'За неделю',
      sold: 62,
    },
    {
      period: 'За месяц',
      sold: 63,
    },
    {
      period: 'За все время',
      sold: 64,
    },
  ];
  return (
    <Box display="flex" flexDirection="column" sx={{ overflow: 'hidden' }}>
      <Typography variant="h6" component="p" sx={{ marginTop: 1, marginBottom: 2 }}>
        Продажи
      </Typography>
      <BoxScrollStyle sx={{ overflowX: 'scroll' }}>
        {sales.map((sale) => (
          <BoxStyle key={sale.period}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {sale.period}
            </Typography>
            <Typography variant="h6">
              {sale.sold}
            </Typography>
          </BoxStyle>
        ))}
      </BoxScrollStyle>
    </Box>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  background: 'white',
  marginRight: theme.spacing(2),
  borderRadius: theme.spacing(1),
  minWidth: 110,
  '&:last-child': {
    marginRight: 0,
  },
}));
const BoxScrollStyle = styled(Box)({
  display: 'flex',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
});
