import React from 'react';

import styled from 'styled-components';

import { S3_BUCKET_URL } from '~/config';

type ImageProps={
    url?: string,
    alt?: string,
    style:{
        width: number,
        height: number,
        marginRight?: number,
    }
}

export function Image({ url, alt, style }:ImageProps) {
  return (
    <ImageStyle
      src={S3_BUCKET_URL + url}
      alt={alt}
      style={style}
    />
  );
}
const ImageStyle = styled('img')({
  borderRadius: 8,
});
