import styled from 'styled-components';

import { userInfo } from 'shared/config/globalVars.ts';

const ChatPage = () => {
  const userStore = userInfo();
  return (
    <StyledContainer>
      {userStore?.username} - {userStore?.userId}
    </StyledContainer>
  );
};

export default ChatPage;

const StyledContainer = styled.section`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-self: center;
  justify-content: center;
`;
