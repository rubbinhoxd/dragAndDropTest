import styled from 'styled-components';
import { FaRegClock } from "react-icons/fa";

export const Container = styled.div`
    font-size: 18px;
    font-weight: bold;
    position: relative; //ficar as atividades a mostra com o grupo
    background: #fff; 
    margin-bottom: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
    
    /* .btn-checkbox{
        display: flex;
        background: red;
        margin-bottom: 5px;
        width: auto;
        background: transparent;
        span{
            width: 110px;
            height: 20px;
            border-radius: 5px;
            background:red;
            color: black;
        }
    } */
`;

export const ClockWrapper = styled.div`
    margin-left: 0px;
    width: 50%;
    background: transparent;
    position: relative;
    top: 7px;
    z-index: 2;
    max-height: 50px;
    border: transparent;
    border-radius: 5px;
`;

export const ClockButton = styled.button`

    width: 100%;
    height: 20px;
    font-size: 13px;
    padding: 0 10px 0 10px;
    background: transparent;
    border-radius: 5px;
    color: black;
    outline: 0;
    border:transparent;

    cursor: pointer;
`;

export const ClockInput = styled.input`

    width: 100%;
    height: 20px;
    font-size: 13px;
    padding: 0 10px 0 10px;
    background: transparent;
    border-radius: 5px;
    color: black;
    outline: 0;
    border:black;

    cursor: pointer;
`;



export const Clock = styled(FaRegClock)`
    position: absolute;
    align-items: center;
    width: 15px;
    height: 12px;
    fill: rgb(96,0,0);
    left: 20px;
    top: 5px;
`;

export const ClockSpan = styled.span`
    display: block;
    width: 10%;
    left: 4px;
    bottom: 7px;
    border-radius: 2px;
    position: absolute;
    border: 3px solid black;
    height: 49%;
    background: transparent;

`;