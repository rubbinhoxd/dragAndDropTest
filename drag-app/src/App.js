import React from 'react';
import Modal from 'react-modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState } from 'react';

import Header from './components/Header';
import Board from './components/Board';
import GlobalStyle from './styles/global'

export default function App() {
  


  return (
    
      <DndProvider backend={HTML5Backend}>
      <Header />
      <Board />

      <GlobalStyle />
      </DndProvider>
      

  );
}




