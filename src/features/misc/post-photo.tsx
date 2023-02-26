import React, { useRef } from 'react';

import {
  Box, Avatar, Typography, Button, CircularProgress,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import photoApi from '~/api/photo/api';
import { Image } from '~/components/image';

type PostPhotoProps = {
  isPhotoUploaded: boolean;
  photoUrl: string;
  photoIdPath: string;
  photoUrlPath: string;
};

export function PostPhoto({
  isPhotoUploaded,
  photoUrl,
  photoIdPath,
  photoUrlPath,
}: PostPhotoProps) {
  const [postPhoto, { isLoading }] = photoApi.endpoints.postPhoto.useMutation();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const methods = useFormContext();

  const { setValue } = methods;

  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    inputFileRef.current!.click();
  };

  async function handleFileSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    if (!e.target.files) return;
    formData.append('image', e.target.files[0]);
    try {
      const { originalUrl, id } = await postPhoto(formData).unwrap();
      setValue(photoIdPath, id);
      setValue(photoUrlPath, originalUrl);
    } catch (error) {
      // response doesn't include status code
      toast.error('Большой размер фото');
    }
  }

  const isPhotoShown = isPhotoUploaded && !isLoading;

  const isPhotoDefault = !isPhotoUploaded && !isLoading;
  return (
    <Box display="flex">
      {isPhotoDefault && <AvatarStyle alt="Photo" />}
      {isLoading && <CircularProgress sx={{ mr: 2 }} />}
      {isPhotoShown && (
        <ImageStyle
          url={photoUrl}
          alt="Продукт"
        />
      )}
      <Box display="flex" flexDirection="column">
        <Typography sx={{ flexGrow: 1 }} variant="body2">
          Фото
        </Typography>
        <input
          type="file"
          ref={inputFileRef}
          style={{ display: 'none' }}
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => handleFileSubmit(e)}
        />
        <ButtonStyle color="info" variant="text" onClick={handleClick} size="small">
          {isPhotoUploaded ? 'Изменить фото' : 'Загрузите фото'}
        </ButtonStyle>
      </Box>
    </Box>
  );
}

const ButtonStyle = styled(Button)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(1),
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  height: 82,
  width: 82,
  borderRadius: theme.spacing(1),
  marginRight: theme.spacing(2),
}));

const ImageStyle = styled(Image)(({ theme }) => ({
  height: 82,
  width: 82,
  marginRight: theme.spacing(2),
}));
