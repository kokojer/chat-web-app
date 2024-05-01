import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Modal, Typography } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { UserMiniCard } from '../../../entities/userMiniCard';

const { Title } = Typography;

const modalStyles = {
  mask: {
    backdropFilter: 'blur(10px)',
  },
};

export const CreateChat: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StyledButton
        icon={<PlusOutlined />}
        type="text"
        size="large"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Chat
      </StyledButton>
      <StyledModal
        title={
          <Title level={2} style={{ margin: '0 0 20px 0' }}>
            Create new chat
          </Title>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        styles={modalStyles}
        width={700}
      >
        <Input
          placeholder="Enter name or username"
          size="large"
          style={{ marginBottom: '10px' }}
        />
        <StyledCardContainer wrap="wrap" gap={5}>
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
          <UserMiniCard />
        </StyledCardContainer>
      </StyledModal>
    </>
  );
};

const StyledButton = styled(Button)`
  height: 60px;
  width: 240px;
  font-size: 20px;
  font-weight: 500;
  background: linear-gradient(90deg, #7cb8f7, #2a8bf2);
  color: white;
  border-radius: 6px;
  transition: 0.3s;
  &&&:hover {
    color: white;
    background: linear-gradient(90deg, #7cb8f7, #2a8bf2);
    box-shadow: 0 0 10px 10px ${({ theme }) => theme.base.boxShadow};
  }
`;

const StyledModal = styled(Modal)``;

const StyledCardContainer = styled(Flex)`
  height: 320px;
  width: calc(100% + 10px);
  overflow: auto;
`;
