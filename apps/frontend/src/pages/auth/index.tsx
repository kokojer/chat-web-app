import styled from 'styled-components';

import { Auth } from 'features/auth';

const AuthPage = () => {
  return (
    <StyledContainer>
      <Auth />
    </StyledContainer>
  );
};

export default AuthPage;

const StyledContainer = styled.section`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-self: center;
  justify-content: center;
`;
