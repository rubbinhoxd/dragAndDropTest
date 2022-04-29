import React from "react";

import { useDrag } from 'react-dnd';
import Modal from 'react-modal';
import { useState } from 'react';

import { Container } from './styles';
import { CloseModal } from '../../styles/global';

export default function Activity( {data, id} ){
    
    //Modal to the Edit of Activity

    const [isEditOfActivity, setIsEditOfActivity] = useState(false);

    function handleOpenActivity() {
        setIsEditOfActivity(true);
    }

    function handleCloseActivity(){
        setIsEditOfActivity(false);
    }

    //Implementation Drag and drop

    const [{isDragging}, drag] = useDrag(() => ({
        type:"ACTIVITY",
        item: {id: data},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    //Edit Activity
    const [title, setTitle] = useState('');

    const [newContent, setNewContent] = useState('');

    const [arrayList, setArrayList] = useState('');


    // data.content = newContent;

    function handleEditActivity(id){
        const data = arrayList.map(item => {
            if(item.id === id){
                return item.content = newContent;
            }
            setNewContent(data);
            handleCloseActivity(false);
        });
    }
    
    

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
                    <CloseModal
                        onClick={handleCloseActivity}
                    />
                    <h2>Editar Atividade</h2>
                    <input type="text" 
                    placeholder="Editar nova Atividade"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <button type='submit'
                        onClick={() => handleEditActivity(id)}
                    >
                        Salvar
                    </button>
                </div>
            </Modal>
        </Container>
    )
}