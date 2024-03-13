import styled from 'styled-components';

import error404 from '/404.svg';

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage = ({ statusCode = 404 }: ErrorPageProps) => {
  return (
    <StyledContainer>
      {statusCode === 404 && <img src={error404} alt={`${statusCode}`} />}
    </StyledContainer>
  );
};

export default ErrorPage;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-self: center;
  justify-content: center;
  img {
    max-height: 80vh;
    max-width: 100vw;
  }
`;
