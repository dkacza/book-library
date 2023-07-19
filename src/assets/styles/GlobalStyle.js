import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Raleway', "Times New Roman", sans-serif;
  }
  body {
    background-color: ${({theme}) => theme.colors.primary1};
  }
  @media (max-width: 720px){
    html {
      font-size: 15px;
    }
  }
  @media (min-width: 2000px){
    html {
      font-size: 18px;
    }
  }
  @media (min-width: 3000px){
    html {
      font-size: 24px;
    }
  }
  
`;
