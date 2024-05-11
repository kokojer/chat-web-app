import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, List, Typography, theme } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const { Title, Text } = Typography;

interface UserMiniCardProps {
  data: {
    firstName: string;
    lastName: string;
    username: string;
    avatar?: string | null;
  };
}

export const UserChatCard: FC<UserMiniCardProps> = ({
  data: { firstName, lastName, username, avatar },
}) => {
  return (
    <StyledListItem key={'4'}>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Flex align="center" gap={15}>
          <Avatar icon={<UserOutlined />} size={50} src={avatar} />
          <Flex vertical>
            <Title level={5} style={{ margin: 0 }} ellipsis>
              {firstName} {lastName}
            </Title>
            <Text>last online 5 hours ago</Text>
          </Flex>
        </Flex>
        <Text>1 minute ago</Text>
      </Flex>
      <StyledMessage>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
        magni necessitatibus quia tempore. Accusantium assumenda at autem
        dolore, ducimus eos excepturi expedita explicabo molestiae mollitia nisi
        perferendis quia sit, voluptatibus? Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Eius explicabo iste magni minima optio!
        Aliquid, distinctio, perspiciatis! Ea eligendi ex facilis harum
        laudantium molestias natus odit, pariatur, quia, ut voluptatibus.
      </StyledMessage>
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  padding-right: 30px;
`;
