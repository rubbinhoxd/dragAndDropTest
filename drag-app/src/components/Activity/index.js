import React from 'react';

import { useDrag } from 'react-dnd';

import { Container } from './styles';

export default function Activity( {data} ){
    
    const [ { isDragging }, dragRef ] = useDrag({
        item: { type: 'GROUP' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    return (
         <Container ref={dragRef} isDragging={isDragging}> 
            <p>{data.content}</p>
        </Container>
    )
}