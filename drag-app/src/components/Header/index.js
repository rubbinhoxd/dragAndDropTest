import React from 'react';

import { Container, SearchWrapper, SearchInput, SearchIcon, Alert} from './styles';


export default function Header() {
  return (
    <Container>
      <SearchWrapper>
        <SearchInput placeholder="Localizar Atividade" />
        <SearchIcon size={60}/>
      </SearchWrapper>
      <Alert size={35}/>
    </Container>
  );
}