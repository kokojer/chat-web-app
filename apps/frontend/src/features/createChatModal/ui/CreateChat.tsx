import { PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Button, Input, Modal, Typography } from 'antd';
import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import { UserMiniCard } from 'entities/userMiniCard';

import { userInfo } from 'shared/config/globalVars.ts';

import { GET_USERS_BY_OCCURRENCES } from '../api.ts';

const { Title } = Typography;

const modalStyles = {
  mask: {
    backdropFilter: 'blur(10px)',
  },
};

export const CreateChat: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { data, previousData } = useQuery(GET_USERS_BY_OCCURRENCES, {
    variables: {
      nameOrUsername: searchValue,
    },
  });

  const userStore = userInfo();
  const foundUsers = useMemo(() => {
    const actualFilteredUsers = data?.getUsersByOccurrences.filter(
      (user) => userStore?.username !== user.username,
    );
    const previousFilteredUsers = previousData?.getUsersByOccurrences.filter(
      (user) => userStore?.username !== user.username,
    );
    return actualFilteredUsers ?? previousFilteredUsers;
  }, [
    data?.getUsersByOccurrences,
    previousData?.getUsersByOccurrences,
    userStore?.username,
  ]);

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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <StyledCardContainer>
          {foundUsers?.length ? (
            foundUsers.map((data) => <UserMiniCard data={data} />)
          ) : (
            <StyledNotFoundError>
              <WarningOutlined /> Users not found
            </StyledNotFoundError>
          )}
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

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: ${({ theme }) => theme.base.background.light};
  }
  .ant-modal-header {
    background: ${({ theme }) => theme.base.background.light};
  }
`;

const StyledCardContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 60px);
  height: 320px;
  width: calc(100% + 10px);
  overflow: auto;
`;

const StyledNotFoundError = styled.div`
  position: absolute;
  font-size: 20px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;
