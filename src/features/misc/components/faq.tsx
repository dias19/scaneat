import React from 'react';

import {
  Accordion, AccordionDetails, AccordionSummary, Box, styled, Typography,
} from '@mui/material';
import { Element } from 'react-scroll';

import { Iconify } from '~/components/Iconify';

import { FAQs } from '../contants';

export const FAQS = 'FAQS';

export function FAQ() {
  return (
    <Box>
      <TypographyHeadingStyle>
        Часто задаваемые вопросы
      </TypographyHeadingStyle>
      <Element name={FAQS}>
        <BoxStyle>
          {
          FAQs.map((quesiton) => (
            <AccordionStyle
              elevation={0}
            >
              <AccordionSummary
                expandIcon={(
                  <Iconify icon="material-symbols:add" />
                  )}
                sx={{ minHeight: 68 }}
              >
                <TypographyBodyStyle>{quesiton.question}</TypographyBodyStyle>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {quesiton.answer}
                </Typography>
              </AccordionDetails>
            </AccordionStyle>
          ))
        }
        </BoxStyle>
      </Element>
    </Box>
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

const AccordionStyle = styled(Accordion)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 0,
  },
  '&:before': {
    display: 'none',
  },
  boxShadow: 'none',
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));
