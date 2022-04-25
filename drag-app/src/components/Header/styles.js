import styled from 'styled-components';
import { FaSearch, FaBell } from "react-icons/fa";
export const Container = styled.div`
  height: 40px;
  padding: 0 30px;
  background: rgb(97,84,200);
  color: white;

  display: flex;
  align-items: center;  
`;

export const SearchWrapper = styled.div`
  margin-left: 3px;
  width: 12%;
  background: #A020F0;

  position: relative;
  top: 0;
  z-index: 2;

  max-height: 30px;
`;

export const SearchInput = styled.input`
  width:100%;
  height: 30px;

  font-size: 16px;
  padding: 0 10px 0 10px;
  background: rgb(184,178,238);
  border-radius: 5px;
  color: white;
  outline: 0;
  
  &::placeholder {
    color: white;
    
  }
`;

export const SearchIcon = styled(FaSearch)`
  position:absolute;
  width: 16px;
  height: 16px;
  fill: rgb(48,46,85);
  left: 170px;
  top:8px;
`;

export const Alert = styled(FaBell)`
  position: absolute;
  right: 0px;
  margin-right: 10px;
  color: black;

`;



