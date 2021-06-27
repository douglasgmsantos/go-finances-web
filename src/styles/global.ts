import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  html {
    font-size: 62.5%; /* 1rem = 10px */
    height: 100%;
}
  body {
    font-family: "Roboto", Helvetica, sans-serif, arial;
    font-weight: 400;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.dark};
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
  }
  body, input, button {
    font-size: ${p => p.theme.fontSizes.default};
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;
