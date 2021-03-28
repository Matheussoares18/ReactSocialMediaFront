import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --background-color: #FAFAFA;
    --main-color: #31575B;
    --secondary-color: #197D67;
    --description-primary-color: #969696;
    --description-secondary-color: #707070;
    --links-color: #1492E6;
    --border-main-color: #D5D5D5;
  
    /* 1rem = 10px*/
 
  }

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
   
  }


  button:focus {
    outline: none;
  }

  input, textarea, select {
    background: transparent;
    border: 1px solid var(--border-main-color);
    border-radius: 6px;
    padding: 5px 12px;
    color: var(--color-input-text);
  }

  input, textarea, select:focus {
    outline: none;
  }

  select {
    border: 1px solid #A0A0A0;
    color: #ACACAC;
    padding: 1.2rem;
  }
  

  a {
    text-decoration: none;
    margin-left: 1.3rem;
    color: #1492E6;
    font-size: 1.3rem;
  }


  .input-error {
    border-color: #d9534f !important;
  }


  .custom-radio-input label input[type='radio']:after {
    width: 18px;
    height: 18px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: var(--color-background);
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid var(--color-border);
  }

  .custom-radio-input label input[type='radio']:checked:after {
    width: 18px;
    height: 18px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: var(--color-primary);
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid var(--color-border);
  }

  #root {
    height: 100%;
  }
`;
