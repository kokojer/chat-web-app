import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "TTNorms";
    src: url("/TTNorms-Bold.woff2") format("woff");
    font-weight: 700;
  }
  
  @font-face {
    font-family: "TTNorms";
    src: url("/TTNorms-Medium.woff2") format("woff");
    font-weight: 500;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'TTNorms' , 'serif';
    font-weight: 500;
    display: flex;
    min-width: 320px;
    min-height: 100vh;
    background: ${({ theme }) => theme.base.ghostWhite};
  }
  
  #root{
    flex: 1;
  }
`;

export default GlobalStyle;
