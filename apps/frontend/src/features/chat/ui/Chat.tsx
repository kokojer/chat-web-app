import { SendOutlined } from '@ant-design/icons';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { Button, Flex, Image, Input, Typography } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { userInfo } from 'shared/config/globalVars.ts';

import { GetChatMessagesQuery } from '../../../../__generated__/graphql.ts';
import {
  GET_CHAT,
  GET_CHAT_MESSAGES,
  SEND_MESSAGE,
  SUBSCRIBE_CHAT,
} from '../api.ts';

const { TextArea } = Input;

const { Title, Text } = Typography;

export const Chat: FC = () => {
  const { id } = useParams();

  const [getChat, { data: chatData, error: chatError }] =
    useLazyQuery(GET_CHAT);

  const [getChatMessages, { data: messageData }] =
    useLazyQuery(GET_CHAT_MESSAGES);

  useEffect(() => {
    if (isNaN(Number(id))) return;
    getChat({
      variables: { id: Number(id) },
    });
    getChatMessages({
      variables: { chatId: Number(id), page: 1 },
    });
  }, [getChat, getChatMessages, id]);

  const userData = userInfo();

  const interlocutor = useMemo(
    () =>
      chatData?.getChat.ChatMembers.find(
        (member) => member.User.id !== userData?.userId,
      )?.User,
    [chatData?.getChat.ChatMembers, userData?.userId],
  );

  const { data: newMessage } = useSubscription(SUBSCRIBE_CHAT, {
    variables: { chatId: Number(id) },
  });

  console.log(newMessage);

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const [messages, setMessages] = useState<
    GetChatMessagesQuery['getChatMessages']
  >([]);

  const [typedMessage, setTypedMessage] = useState('');

  useEffect(() => {
    if (!messageData) return;
    setMessages(messageData.getChatMessages);
  }, [messageData]);

  useEffect(() => {
    if (!newMessage) return;
    setMessages((prev) =>
      prev ? [newMessage.messageAdded, ...prev] : [newMessage.messageAdded],
    );
  }, [newMessage]);

  return (
    <ChatContainer>
      {(() => {
        if (chatError?.graphQLErrors.length) {
          return (
            <Flex align="center" justify="center" flex={1}>
              {chatError?.graphQLErrors[0].message}
            </Flex>
          );
        }

        return interlocutor ? (
          <>
            <ChatHeader>
              <Flex align="center" gap={30}>
                <Image
                  src={
                    interlocutor.avatar ??
                    'https://img2.fedpress.ru/thumbs/480x480/2023/05/25/24d44957623fa939889b7b6a2d1bfa46.jpg'
                  }
                  alt="avatar"
                />
                <Flex vertical>
                  <Title level={3} style={{ margin: 0 }} ellipsis>
                    {interlocutor.firstName} {interlocutor.lastName}
                  </Title>
                  <Text>
                    {interlocutor.lastVisitTime
                      ? interlocutor.lastVisitTime
                      : 'online'}
                  </Text>
                </Flex>
              </Flex>
            </ChatHeader>
            <Messages>
              {messages.map((message) => {
                return (
                  <Message
                    $interlocutorMessage={message.userId !== userData?.userId}
                  >
                    <MessageContent>
                      {message.MessageContent[0].content}
                    </MessageContent>
                    <MessageDate>
                      {formatDistanceToNow(message.createdAt, {
                        addSuffix: true,
                      })}
                    </MessageDate>
                  </Message>
                );
              })}
            </Messages>
            <FooterContainer>
              <StyledTextarea
                size="large"
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="Type your message..."
                value={typedMessage}
                onChange={(e) => {
                  setTypedMessage(e.target.value);
                }}
              />
              <Button
                icon={<SendOutlined />}
                type="primary"
                onClick={async () => {
                  await sendMessage({
                    variables: {
                      chatId: Number(id),
                      text: typedMessage,
                    },
                  });
                  setTypedMessage('');
                }}
              >
                Send
              </Button>
            </FooterContainer>
          </>
        ) : (
          <Flex align="center" justify="center" flex={1}>
            Chat not found!
          </Flex>
        );
      })()}
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 6px;
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
  max-height: 150px;
  .ant-image {
    overflow: hidden;
    border-radius: 50%;
    max-width: 100px;
    max-height: 100px;
    min-width: 50px;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  button {
    padding: 0 30px;
    height: 100%;
    font-size: 16px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  textarea {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  gap: 8px;
  padding: 15px;
  flex: 1;
`;

const MessageContent = styled(Typography)`
  font-size: 15px;
`;

const MessageDate = styled(Typography)`
  font-size: 12px;
`;

const Message = styled.div<{ $interlocutorMessage: boolean }>`
  background-color: ${({ theme, $interlocutorMessage }) =>
    $interlocutorMessage
      ? theme.base.background.messageSecondary
      : theme.base.background.messagePrimary};
  align-self: ${({ $interlocutorMessage }) =>
    $interlocutorMessage ? 'flex-end' : 'flex-start'};
  align-items: ${({ $interlocutorMessage }) =>
    $interlocutorMessage ? 'flex-end' : 'flex-start'};
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
`;

const StyledTextarea = styled(TextArea)`
  padding: 10px 20px;
  font-size: 17px;
  border-radius: 6px;
  border: 1px solid lightgray;
  cursor: pointer;

  .ant-input-prefix {
    color: gray;
    margin-right: 10px;
  }
`;
