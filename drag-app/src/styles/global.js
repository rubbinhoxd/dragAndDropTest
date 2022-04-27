
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
  //estilização do modal
  .react-modal-overlay{
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom:0;

    display:flex;
    align-items: center;
    justify-content: center;
    
  }
  .react-modal-content{
    width: 100%;
    max-width: 576px;
    background: rgba(239,237,238, 0.9);
    padding: 3rem;
    position: relative;
    
    h2{
      color:rgb(50,13,241);        
      margin-bottom: 2rem;
    }
    input{
      width: 100%;
      padding: 0 1.5rem;
      height: 4rem;

      background: white;
      
      color:black;
      font-weight: bold;
      font-size: 20px;

      &::placeholder{
        color:rgb(50,13,241);
        opacity: 0.7;      }
    }
    button[type="submit"]{
      width: 100%;
      padding: 0 1.5rem;
      height: 4rem;
      background:rgb(50,13,241);
      color: white;
      font-weight: bold;
      font-size: 20px;
      margin-top: 1.5rem;
    }
  }

  .react-modal-activity{
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom:0;

    display:flex;
    align-items: center;
    justify-content: center;
  }
  .react-modal-contentActivity{
    width: 100%;
    max-width: 576px;
    background: rgba(239,237,238, 0.9);
    padding: 3rem;
    position: relative;

    display:flex;
    align-items: center;
    justify-content: center;

    h2{
      color:rgb(50,13,241);        
      margin-bottom: 2rem;
    }
    input{
      width: 100%;
      padding: 0 1.5rem;
      height: 4rem;

      background: white;
      
      color:black;
      font-weight: bold;
      font-size: 20px;

      &::placeholder{
        color:rgb(50,13,241);
        opacity: 0.7;      }
    }
    button[type="submit"]{
      width: 100%;
      padding: 0 1.5rem;
      height: 4rem;
      background:rgb(50,13,241);
      color: white;
      font-weight: bold;
      font-size: 20px;
      margin-top: 1.5rem;
    }

  }

`;