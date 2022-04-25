import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box; 
  }

  html, body, #root {
    height: 100vh;
    width:100vw;
  }

  body {
    font: 14px 'Roboto', sans-serif;
    background: white;
    color: #333;
    -webkit-font-smoothing: antialiased !important;
  }

  ul {
    list-style: none;
  }
`;