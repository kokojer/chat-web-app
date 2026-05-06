import { SearchOutlined } from '@ant-design/icons';
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client';
import { Empty, Input, List, Skeleton } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { UserChatCard } from 'entities/userChatCard';

import { userInfo } from 'shared/config/globalVars.ts';

import { GetChatsForUserQuery } from '../../../../__generated__/graphql.ts';
import { GET_CHATS_FOR_USER, SUBSCRIBE_CHATS } from '../api.ts';

export const SearchChats: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const currentUser = useReactiveVar(userInfo);
  const userId = currentUser?.userId ?? 0;
  const { data, loading } = useQuery(GET_CHATS_FOR_USER, {
    variables: {
      userId,
      page: 1,
    },
    skip: !userId,
  });
  const { data: updatedChatData } = useSubscription(SUBSCRIBE_CHATS, {
    variables: {
      userId,
    },
    skip: !userId,
  });
  const [chats, setChats] = useState<GetChatsForUserQuery['getChatsForUser']>(
    [],
  );

  useEffect(() => {
    if (data?.getChatsForUser) {
      setChats(data.getChatsForUser);
    }
  }, [data?.getChatsForUser]);

  useEffect(() => {
    const updatedChat = updatedChatData?.chatUpdated;
    if (!updatedChat) return;

    setChats((prevChats) => [
      updatedChat,
      ...prevChats.filter((chat) => chat.id !== updatedChat.id),
    ]);
  }, [updatedChatData?.chatUpdated]);

  const filteredChats = useMemo(
    () =>
      chats.filter((chat) => {
        const interlocutor = chat.ChatMembers.find(
          (member) => member.User.id !== currentUser?.userId,
        )?.User;
        const search = searchValue.trim().toLowerCase();

        if (!search) return true;

        return [
          interlocutor?.firstName,
          interlocutor?.lastName,
          interlocutor?.username,
        ]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(search));
      }),
    [chats, currentUser?.userId, searchValue],
  );

  return (
    <StyledContainer>
      <StyledInput
        prefix={<SearchOutlined />}
        size="large"
        placeholder="Search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <ScrollableDiv id="scrollableDiv">
        {loading ? (
          <Skeleton avatar paragraph={{ rows: 2 }} active />
        ) : filteredChats.length ? (
          <List
            dataSource={filteredChats}
            renderItem={(chat) => {
              const interlocutor = chat.ChatMembers.find(
                (member) => member.User.id !== currentUser?.userId,
              )?.User;
              const lastMessage = chat.Message[0];

              if (!interlocutor) return null;

              return (
                <UserChatCard
                  data={{
                    chatId: chat.id,
                    avatar: interlocutor.avatar,
                    firstName: interlocutor.firstName,
                    lastName: interlocutor.lastName,
                    username: interlocutor.username,
                    lastMessage: lastMessage?.MessageContent[0]?.content,
                    lastMessageCreatedAt: lastMessage?.createdAt,
                  }}
                />
              );
            }}
          />
        ) : (
          <Empty description="Chats not found" />
        )}
      </ScrollableDiv>
    </StyledContainer>
  );
};

const StyledInput = styled(Input)`
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 6px;
  box-shadow: 3px 3px 5px 0 ${({ theme }) => theme.base.boxShadow};
  border: 1px solid lightgray;
  cursor: pointer;
  &:hover {
    border: 1px solid lightgray;
  }

  .ant-input-prefix {
    color: gray;
    margin-right: 10px;
  }

  &.ant-input-outlined:focus-within {
    box-shadow: 0 0 7px 5px ${({ theme }) => theme.base.boxShadow};
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  .ant-list-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-bottom: 10px;
  }
`;

const ScrollableDiv = styled.div`
  overflow: auto;
  padding-right: 14px;
`;
