import React from 'react';
import { Container } from './styles';
import Activity from '../Activity';
import { useState } from 'react';
import {useDrop} from 'react-dnd';
import Modal from 'react-modal';

export default function Group( { data }){
    
    //Modal of button 'New Card'
    const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

    function handleOpenNewGroupModal() {
        setIsNewGroupModalOpen(true); //modal aberto
    }

    function handleCloseNewGroupModal() {
        setIsNewGroupModalOpen(false); //modal fechado
    }


    const [{isOver}, drop] = useDrop(() => ({
        accept: "ACTIVITY",
        drop: (item) => addActivityToGroup(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));


    const addActivityToGroup = (id) => {
        console.log(id);
        // const listActivity = listActivity.filter((activity) => id === activity.id)

    };

    return(
        <Container 
        ref={drop}
        >
            <header>
                {/* <input type="button" className="btn-primary"/> */}
                <button className="btn-primary">{data.title}</button>
            </header>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <ul style={{width: '90%'}}>
                    { data.cards.map(card => <Activity key= {card.id} data={card}/>) }
                </ul>
            </div>
            <button 
            class="btn-secundary" 
            onClick={handleOpenNewGroupModal}>
                Novo Card +
            </button>
            <Modal 
                isOpen={isNewGroupModalOpen} 
                onRequestClose={handleCloseNewGroupModal}
                overlayClassName='react-modal-overlay'
                className='react-modal-content'
            >
                <div className="modalGroup">
                    <h2>Cadastrar Card</h2>
                    <input  
                    placeholder="Cadastrar novo Card"
                    />
                    <button type='submit'>Salvar</button>
                </div>
                
            </Modal>
        </Container>
    )
}