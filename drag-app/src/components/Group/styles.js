import styled from 'styled-components';


export const Container = styled.div`
    width: 290px;
    min-width: 120px;
    padding: 0;
    height: 100%;
    margin: 25px;
    /* flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 320px; */
    background: rgb(236,236,236);

    .btn-primary{
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

    }
    .btn-secundary{
        background: transparent;
        border: 0;
        
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 10px;

        font-size: 20px;
        font-weight: bold;
        font-style: 'Roboto';
        color: rgb(60, 54, 178);
        
        cursor: pointer;

        transition: filter 0.5s ease-out;
        &:hover{ //quando passar o mouse por cima do button
            filter: brightness(0.9);
        }
    }

    ul{
        margin-top:10px;
        margin-left: 10px;
    }
    .modalContainer h2{
        
            color: bold;
            font-size: 300px;
            margin-bottom: 2rem;
        }
        /* input{
            width: 100%;
            padding: 0 1.5rem;
            height:4rem;
            background: #e7e9ee;
        } */
    
`;