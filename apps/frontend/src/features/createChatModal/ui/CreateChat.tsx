import { PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Button, Input, Modal, Typography } from 'antd';
import { FC, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

import { UserMiniCard } from 'entities/userMiniCard';

import { userInfo } from 'shared/config/globalVars.ts';

import { GetUserByOccurrencesQuery } from '../../../../__generated__/graphql.ts';
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
  const [page, setPage] = useState(0);
  const { data, previousData } = useQuery(GET_USERS_BY_OCCURRENCES, {
    variables: {
      nameOrUsername: searchValue,
      page,
    },
  });

  const [users, setUsers] = useState<
    GetUserByOccurrencesQuery['getUsersByOccurrences']
  >([]);

  const userStore = userInfo();
  const foundUsers = useMemo(() => {
    const firstData = data && data?.getUsersByOccurrences;
    const actualUsers = users?.length ? users : firstData;
    const actualFilteredUsers = actualUsers?.filter(
      (user) => userStore?.username !== user.username,
    );

    const previousFilteredUsers = previousData?.getUsersByOccurrences.filter(
      (user) => userStore?.username !== user.username,
    );
    return actualFilteredUsers ?? previousFilteredUsers;
  }, [data, previousData?.getUsersByOccurrences, userStore?.username, users]);
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
          onChange={(e) => {
            setSearchValue(e.target.value);
            setPage(0);
            setUsers([]);
          }}
        />
        <StyledScrollContainer id="scrollableDiv">
          <InfiniteScroll
            dataLength={users.length}
            next={() => {
              setPage((prevState) => prevState + 1);
              setUsers((prev) =>
                data ? [...prev, ...data.getUsersByOccurrences] : prev,
              );
            }}
            hasMore
            loader={''}
            scrollableTarget="scrollableDiv"
          >
            {foundUsers?.length ? (
              foundUsers.map((data) => <UserMiniCard data={data} />)
            ) : (
              <StyledNotFoundError>
                <WarningOutlined /> Users not found
              </StyledNotFoundError>
            )}
          </InfiniteScroll>
        </StyledScrollContainer>
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

const StyledScrollContainer = styled.div`
  height: 300px;
  overflow-x: hidden;
  position: relative;
  .infinite-scroll-component {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fill, 60px);
    height: 320px;
    width: calc(100% + 10px);
  }
`;

const StyledNotFoundError = styled.div`
  position: absolute;
  font-size: 20px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;
