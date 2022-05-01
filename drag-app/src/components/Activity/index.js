import React from "react";

import { useDrag } from 'react-dnd';
import Modal from 'react-modal';
import { useState } from 'react';

import { Container, ClockWrapper, ClockInput, Clock, ClockSpan } from './styles';
import { CloseModal } from '../../styles/global';
import { api } from "../../services/api";



export default function Activity( { name, id, idGroup, Load } ){
    
    //Modal to the Edit of Activity

    const [isEditOfActivity, setIsEditOfActivity] = useState(false);

    function handleOpenActivity() {
        setIsEditOfActivity(true);
    }

    function handleCloseActivity(){
        setIsEditOfActivity(false);
    }

    // const toggleActivityModal = () => setIsEditOfActivity(!isEditOfActivity)


    //Implementation Drag and drop

    const [{isDragging}, drag] = useDrag(() => ({
        type:"ACTIVITY",
        item: {id: name},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    //Edit Activity
    // const [title, setTitle] = useState('');

    const [newContent, setNewContent] = useState('');

    // const [arrayList, setArrayList] = useState(data);

    
    const handleEditActivity = () => {
        if(newContent === ''){
            return;
        }
        api.put(`/activity/${id}`, {
            idGroup: idGroup,
            nameOfActivity: newContent,
        }).then((res) => {
            console.log('*', res );
            Load();
            handleCloseActivity();
        }) 
    }

    

    // dragRef(dropRef(ref)); //ref possui referencia tanto do drag quanto do drop
    
    return (
        <>
        <Container 
        ref={drag}
        isDragging={isDragging}
        style = {{border: isDragging ? "5px solid rgba(50, 13, 241, 0.4)": "0px"}}
        onClick = {()=> handleOpenActivity()}
        > 
            <p>{name}</p>
            <ClockWrapper>
                <ClockInput />
                <Clock />
                <ClockSpan />
            </ClockWrapper>
                

            {/* <div className="btn-checkbox">
                <input type="checkbox"/>
                <span>foda-se</span>
            </div> */}
        </Container>
        <Modal 
                isOpen={isEditOfActivity}
                onRequestClose={() => handleCloseActivity()}
                overlayClassName='react-modal-activity'
                className='react-modal-contentActivity'
            >
                <div className="modalActivity"> 
                    <CloseModal
                        onClick={()=> handleCloseActivity()}
                    />
                    <h2>Editar Atividade</h2>
                    <input 
                    value={newContent}
                    type="text" 
                    onChange={(e) => setNewContent(e.target.value)}
                    />
                    <button 
                    type='button'
                    onClick={() => handleEditActivity(id)}

                    >
                        Salvar
                    </button>
                </div>
            </Modal>
        </>
        
                
    )
}