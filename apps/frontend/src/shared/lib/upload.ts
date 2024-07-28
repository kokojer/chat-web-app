import { GetProp, UploadFile, UploadProps, message } from 'antd';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const getBase64 = (file: FileType): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];

export const beforeUpload = (file: FileType) => {
  console.log(file.type);
  const isAllowedImageFormat = allowedTypes.includes(file.type);
  if (!isAllowedImageFormat)
    message.error('You can only upload JPG/PNG/SVG/GIF file!');

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) message.error('Image must smaller than 2MB!');

  return isAllowedImageFormat && isLt2M;
};

export const getDefaultFile = (url?: string): UploadFile => ({
  uid: '1',
  name: 'image',
  status: 'done',
  url,
});

export type RcCustomRequestOptions<T = any> = Parameters<
  Exclude<UploadProps<T>['customRequest'], undefined>
>[0];
