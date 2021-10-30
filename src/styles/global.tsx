import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 
  * {
    margin: 0;
    padding: 0;
  }
  :root{
    --blue: #0CAACD;
  }
  html{
        @media(max-width:1080px){
            font-size: 93.75%; //15px
        }
        @media(max-width:720px){
            font-size: 87.5%; //14px
        }
  }
  html, body, #root {
    height: 100%;
    scroll-behavior: smooth;
    --roboto-font-family: 'Roboto', sans-serif;

    

    font-family: var(--roboto-font-family);
  }


  button{
      user-select: none;
      cursor: pointer;
  }
    [disabled]{
        opacity:0.6;
        cursor: not-allowed;
    }
    body, input, textarea, button{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
    h1, h1, h3, h4, h5, h6, strong{
        font-weight:600;
    }
`;
