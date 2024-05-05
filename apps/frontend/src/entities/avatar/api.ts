import { gql } from '../../../__generated__';

export const ADD_USER_IMAGE = gql(`
  mutation addImage($base64Image: String!, $fileType: String!) {
    addUserImage(base64Image: $base64Image, fileType: $fileType)
  }
`);

export const DELETE_USER_IMAGE = gql(`
  mutation deleteImage {
    deleteUserImage
  }
`);
