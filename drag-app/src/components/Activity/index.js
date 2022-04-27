import React, { useRef } from 'react';

import { useDrag } from 'react-dnd';
import Modal from 'react-modal';
import { useState } from 'react';

import { Container } from './styles';

export default function Activity( {data, id} ){
    
    //Modal to the Edit of Activity

    const [isEditOfActivity, setIsEditOfActivity] = useState(false);

    function handleOpenActivity() {
        setIsEditOfActivity(true);
    }

    function handleCloseActivity(){
        setIsEditOfActivity(false);
    }

    const [{isDragging}, drag] = useDrag(() => ({
        type:"ACTIVITY",
        item: {id: data},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    
    

    // dragRef(dropRef(ref)); //ref possui referencia tanto do drag quanto do drop
    
    return (
        <Container 
        ref={drag}
        isDragging={isDragging}
        style = {{border: isDragging ? "5px solid rgba(50, 13, 241, 0.4)": "0px"}}
        onClick = {handleOpenActivity}
        > 
            <p>{data.content}</p>
            <Modal 
                isOpen={isEditOfActivity}
                onRequestClose={handleCloseActivity}
                overlayClassName='react-modal-activity'
                className='react-modal-contentActivity'
            >
                <div className="modalActivity">
                    <h2>Editar Atividade</h2>
                    <input  
                    placeholder="Editar nova Atividade"
                    />
                    <button type='submit'>Salvar</button>
                </div>
            </Modal>
        </Container>
    )
}