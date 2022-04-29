import styled from 'styled-components';


export const Container = styled.div`

    display: flex;
    justify-content: left;
    //align-items: center;
    padding: 30px 0; //espaça do header
    //height: calc(100% - 80px);
    
    button{
        box-sizing: border-box;
        background: rgba(239,237,238);
        font-size: 26px;
        font-weight: 500;
        color: rgba(50,42,163);

        cursor: pointer;

        transition: filter 0.5s ease-out;
        &:hover{ //quando passar o mouse por cima do button
            filter: brightness(0.9);
        }
    }
    .input-new-group{
        width: 100%;
        height: 100%;
        padding: 10px;
        font-size: 26px;
        font-weight: 500;  
        color: white;
        background: rgba(50, 13, 241);

        cursor: pointer;

        transition: filter 0.5s ease-out;
        &:hover{ //quando passar o mouse por cima do button
            filter: brightness(0.9);
        }


        &::placeholder{
            color:white;
        }

    }

`;