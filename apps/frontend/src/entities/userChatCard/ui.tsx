import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, List, Typography } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Text } = Typography;

interface UserMiniCardProps {
  data: {
    chatId: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar?: string | null;
    lastMessage?: string | null;
    lastMessageCreatedAt?: Date | string | null;
  };
}

export const UserChatCard: FC<UserMiniCardProps> = ({
  data: {
    chatId,
    firstName,
    lastName,
    username,
    avatar,
    lastMessage,
    lastMessageCreatedAt,
  },
}) => {
  const navigate = useNavigate();
  const lastMessageTime = lastMessageCreatedAt
    ? formatDistanceToNow(lastMessageCreatedAt, { addSuffix: true })
    : '';

  return (
    <StyledListItem onClick={() => navigate(`/chat/${chatId}`)}>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Flex align="center" gap={15}>
          <Avatar icon={<UserOutlined />} size={50} src={avatar} />
          <Flex vertical>
            <Title level={5} style={{ margin: 0 }} ellipsis>
              {firstName} {lastName}
            </Title>
            <Text ellipsis>@{username}</Text>
          </Flex>
        </Flex>
        <MessageTime>{lastMessageTime}</MessageTime>
      </Flex>
      <StyledMessage>{lastMessage ?? 'No messages yet'}</StyledMessage>
    </StyledListItem>
  );
};

const StyledListItem = styled(List.Item)`
  user-select: none;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  background: ${({ theme }) => theme.base.background.main};
  border-radius: 6px;
  box-shadow: 3px 3px 5px 0 ${({ theme }) => theme.base.boxShadow};
  .ant-avatar {
    min-width: 40px;
  }
  &.ant-list-item {
    padding: 30px;
  }
  &:hover {
    box-shadow: 6px 6px 0 0 ${({ theme }) => theme.base.boxShadow};
  }
`;

const StyledMessage = styled(Text)`
  width: 100%;
  text-align: left;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  padding-right: 30px;
`;

const MessageTime = styled(Text)`
  flex-shrink: 0;
  color: ${({ theme }) => theme.base.typography.inActiveText};
`;
