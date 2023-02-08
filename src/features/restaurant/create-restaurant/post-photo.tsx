import React, { useRef } from 'react';

import {
  Box, Avatar, Typography, Button,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import restaurantApi from '~/api/restaurant/api';
import { Image } from '~/components/image';
import { useAppSelector } from '~/store';

export function PostPhoto() {
  const [postPhoto] = restaurantApi.endpoints.postPhoto.useMutation();

  const { photoId, photoUrl, photoUploaded } = useAppSelector((state) => state.photoSlice);

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
    await postPhoto(formData);
    setValue('photoId', photoId);
  }

  return (
    <Box display="flex">
      {
          !photoUploaded
          && (
          <AvatarStyle
            alt="Photo"
          />
          )
        }
      {photoUploaded && (
      <Image
        style={{ height: 82, width: 82 }}
        url={photoUrl}
        alt="Продукт"
      />
      )}
      <Box display="flex" flexDirection="column">
        <Typography sx={{ flexGrow: 1 }} variant="body2">
          Фото ресторана
        </Typography>
        <input
          type="file"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={(e) => handleFileSubmit(e)}
        />
        <ButtonStyle
          color="info"
          variant="text"
          onClick={handleClick}
          size="small"
        >
          {
            photoUploaded ? 'Изменить фото ресторана' : 'Загрузите фото'
          }
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
