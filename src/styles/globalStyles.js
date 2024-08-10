import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body {
        background-color: ${({ theme }) => theme.colors.bg[0]};
        color: ${({ theme }) => theme.colors.text[0]};

        font-size: 16px;
        font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
    }
`;

export default GlobalStyle;
