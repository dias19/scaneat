import React from 'react';

import { Box, BoxProps } from '@mui/material';
import styled from 'styled-components';

import { S3_BUCKET_URL } from '~/config';

type ImageProps={
    url?: string,
    alt?: string,
}

type CombinedProps=ImageProps & BoxProps

export function Image({ url, alt, ...other }:CombinedProps) {
  return (
    <Box {...other}>
      <ImageStyle
        src={S3_BUCKET_URL + url}
        loading="lazy"
        alt={alt}
      />
    </Box>
  );
}
const ImageStyle = styled('img')({
  objectFit: 'cover',
  borderRadius: 8,
  width: '100%',
  height: '100%',
});
