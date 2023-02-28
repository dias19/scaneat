import React from 'react';

import {
  Accordion, AccordionDetails, AccordionSummary, Box, styled, Typography,
} from '@mui/material';
import { Element } from 'react-scroll';

import { Iconify } from '~/components/Iconify';

import { FAQs } from '../contants';

export function FAQ() {
  return (
    <>
      <TypographyHeadingStyle>
        Часто задаваемые вопросы
      </TypographyHeadingStyle>
      <Element name="FAQ">
        <BoxStyle>
          {
          FAQs.map((quesiton) => (
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={(
                  <Iconify icon="material-symbols:add" />
                  )}
              >
                <TypographyBodyStyle>{quesiton.question}</TypographyBodyStyle>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {quesiton.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        }
        </BoxStyle>
      </Element>
    </>
  );
}

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

const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
}));
