import { MoreOutlined } from '@ant-design/icons';
import { Button, Flex, Image, Typography, theme } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const { Title, Text } = Typography;

export const Chat: FC = () => {
  return (
    <ChatContainer>
      <ChatHeader>
        <Flex align="center" gap={30}>
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <Flex vertical>
            <Title level={3} style={{ margin: 0 }} ellipsis>
              Кирилова Ольга
            </Title>
            <Text>last online 5 hours ago</Text>
          </Flex>
        </Flex>
      </ChatHeader>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex: 1 1 60%;
  width: 100%;
  height: 100%;
  box-shadow: 5px 5px 10px 2px ${({ theme }) => theme.base.boxShadow};
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  background: ${({ theme }) => theme.base.background.main};
  align-items: center;
  flex: 1;
  padding: 30px;
  width: 100%;
  height: 150px;
  .ant-image {
    overflow: hidden;
    border-radius: 50%;
    max-width: 100px;
    max-height: 100px;
  }
`;
