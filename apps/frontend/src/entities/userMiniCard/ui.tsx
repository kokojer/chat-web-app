import { UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Avatar, Flex, Typography } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

import { CREATE_CHAT } from './api.ts';

const { Title, Text } = Typography;

interface UserMiniCardProps {
  data: {
    firstName: string;
    lastName: string;
    username: string;
    avatar?: string | null;
    userId: number;
  };
}

export const UserMiniCard: FC<UserMiniCardProps> = ({
  data: { firstName, lastName, username, avatar, userId },
}) => {
  const [createChat] = useMutation(CREATE_CHAT);
  return (
    <StyledFlex
      align="center"
      gap={10}
      flex={1}
      onClick={async () => {
        await createChat({ variables: { userId } });
      }}
    >
      <Avatar icon={<UserOutlined />} size="large" src={avatar} />
      <Flex vertical style={{ overflow: 'hidden' }}>
        <Title level={5} style={{ margin: 0 }} ellipsis>
          {firstName} {lastName}
        </Title>
        <Text ellipsis>@{username}</Text>
      </Flex>
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex)`
  user-select: none;
  padding: 7px;
  cursor: pointer;
  max-width: 200px;
  max-height: 46px;
  transition: 0.3s;
  .ant-avatar {
    min-width: 40px;
  }
  &:hover {
    box-shadow: inset 0 0 4px 4px lightgrey;
    border-radius: 5px;
  }
`;
