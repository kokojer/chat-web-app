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
        min-width: 320px;
        min-height: 100vh;
        display: flex;
        font-family: 'TTNorms', 'serif';
        font-weight: 500;
    }

    #root {
        flex: 1;
    }

    /* width */

    &::-webkit-scrollbar {
        width: 7px;
        border-radius: 5px;
    }

    /* Track */

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 5px;
    }

    /* Handle */

    &::-webkit-scrollbar-thumb {
        background: #b4b0b0;
        border-radius: 5px;
    }

    /* Handle on hover */

    &::-webkit-scrollbar-thumb:hover {
        background: #bdbdbd;
    }
`;

export default GlobalStyle;
