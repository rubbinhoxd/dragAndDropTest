import React from 'react';
import Header from './components/Header';
import Board from './components/Board';
import GlobalStyle from './styles/global'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { useState } from 'react';

export default function App() {
  


  return (

     <>
      <Header />
      <Board />

      <GlobalStyle />
    
     </>
        
   
        

  );
}




