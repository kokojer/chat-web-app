import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Image, Spin, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { userInfo } from 'shared/config/globalVars.ts';
import {
  FileType,
  RcCustomRequestOptions,
  beforeUpload,
  getBase64,
  getDefaultFile,
} from 'shared/lib/upload.ts';

import { ADD_USER_IMAGE, DELETE_USER_IMAGE } from './api.ts';

interface AvatarProps {
  collapsed: boolean;
}

export const Avatar: FC<AvatarProps> = ({ collapsed }) => {
  const [addUserImage, { data, loading }] = useMutation(ADD_USER_IMAGE);
  const [deleteUserImage] = useMutation(DELETE_USER_IMAGE);
  const userStore = userInfo();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(
    userStore?.avatar ? [getDefaultFile(userStore.avatar)] : [],
  );

  const customRequest = useCallback(
    async ({ file }: RcCustomRequestOptions) => {
      const rcFile = file as RcFile;
      const base64 = await getBase64(rcFile);
      await addUserImage({
        variables: { base64Image: base64, fileType: rcFile.type },
      });
    },
    [addUserImage],
  );

  const onChange: UploadProps['onChange'] = useCallback(
    ({ fileList: newFileList }: UploadChangeParam) => {
      if (newFileList[0]?.status === 'uploading') return;
      setFileList(newFileList);
    },
    [],
  );

  const handlePreview = useCallback(async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  }, []);

  useEffect(() => {
    if (!data) return;
    setFileList([getDefaultFile(data.addUserImage)]);
  }, [data]);

  return (
    <StyledImageContainer $collapsed={collapsed}>
      <ImgCrop
        rotationSlider
        beforeCrop={(file) => !/.svg/.test(file.name)}
        cropShape="round"
      >
        <Upload
          listType="picture-circle"
          beforeUpload={beforeUpload}
          customRequest={customRequest}
          onRemove={() => {
            deleteUserImage();
          }}
          fileList={fileList}
          onChange={onChange}
          disabled={collapsed}
          onPreview={handlePreview}
        >
          {(() => {
            if (loading) return <Spin indicator={<LoadingOutlined spin />} />;
            else if (fileList.length < 1) return <UploadOutlined />;
          })()}
        </Upload>
      </ImgCrop>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </StyledImageContainer>
  );
};

const StyledImageContainer = styled.div<{ $collapsed: boolean }>`
  height: 102px;
  .ant-upload-list .ant-upload-list-item-container .ant-upload-list-item {
    padding: 0;
  }
  .ant-upload-wrapper.ant-upload-picture-circle-wrapper
    .ant-upload-list.ant-upload-list-picture-circle {
    .ant-upload-list-item-container {
      transition: 0.2s;
      width: ${({ $collapsed }) => ($collapsed ? '32px' : '96px')};
      height: ${({ $collapsed }) => ($collapsed ? '32px' : '96px')};
    }
    .ant-upload-list-item::before {
      width: 100%;
      height: 100%;
    }
  }
`;
