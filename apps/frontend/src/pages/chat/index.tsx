import { Flex, Typography } from 'antd';
import styled from 'styled-components';

import { Chat } from 'features/chat';
import { SearchChats } from 'features/searchChats';

import { CreateChat } from '../../features/createChatModal';

const { Title } = Typography;

const ChatPage = () => {
  return (
    <StyledContainer>
      <Flex flex="1 1 40%" vertical gap="30px">
        <Flex justify="space-between" align="center">
          <Title>Chats</Title>
          <CreateChat />
        </Flex>
        <SearchChats />
      </Flex>
      <Chat />
    </StyledContainer>
  );
};

export default ChatPage;

const StyledContainer = styled.section`
  width: 100%;
  height: 100%;
  flex: 1;
  gap: 60px;
  display: flex;
  align-self: center;
  justify-content: center;

  h1 {
    font-size: 36px;
    margin: 0;
  }
`;
