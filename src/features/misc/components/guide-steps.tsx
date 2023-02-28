import React from 'react';

import {
  Box, Card, styled, Typography,
} from '@mui/material';
import { Element } from 'react-scroll';

import { StepsDetails } from '../contants';

export function GuideSteps() {
  return (
    <Element name="guideSteps">
      <TypographyHeadingStyle>
        Как работает
      </TypographyHeadingStyle>
      <BoxContainerStyle>
        {
                StepsDetails.map((stepDetail) => (
                  <CardStyle>
                    <ImageStyle
                      alt="step"
                      src={stepDetail.photo}
                      height={198}
                    />
                    <Box display="flex" flexDirection="column" padding={1.5}>
                      <TypographyBodyStyle>
                        Шаг
                        {' '}
                        {stepDetail.step}
                        .
                      </TypographyBodyStyle>
                      <TypographySubtitleStyle>
                        {stepDetail.description}
                      </TypographySubtitleStyle>
                    </Box>
                  </CardStyle>
                ))
            }
      </BoxContainerStyle>
    </Element>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(5),
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    gap: 0,
  },
}));

const CardStyle = styled(Card)(({ theme }) => ({
  backgroundColor: 'white',
  display: 'inline-flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },
}));

const TypographyHeadingStyle = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  lineHeight: '46px',
  [theme.breakpoints.up('sm')]: {
    fontWeight: 'bold',
    fontSize: 30,
  },
}));

const TypographyBodyStyle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  lineHeight: '22px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
}));

const TypographySubtitleStyle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  lineHeight: '26px',
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
}));

const ImageStyle = styled('img')({
  objectFit: 'cover',
});
