import React from 'react';
import { Container } from './styles';
import Activity from '../Activity';
import { useState } from 'react';
import {useDrop} from 'react-dnd';
import Modal from 'react-modal';
import { CloseModal } from '../../styles/global';

export default function Group( { data }){
    //Editing group in title
    const [viewButton, setViewButton] = useState(true);
    
    const [titleGroup, setTitleGroup] = useState(data.title);

    function handleChangeButton(){
        setViewButton(false);
    }


    //Modal of button 'New Card'
    const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
    
    function handleOpenNewGroupModal() {
        setIsNewGroupModalOpen(true); //modal aberto
    }

    function handleCloseNewGroupModal() {
        setIsNewGroupModalOpen(false); //modal fechado
    }
    //add new activity

    const [title, setTitle] = useState('');

    const [arrayList, setArrayList] = useState(data.cards);
    
    function handleNewActivity(){
        const data = {
            id: 10,
            content: title
        }
        setArrayList([...arrayList, data]);
        handleCloseNewGroupModal(false);

    }

    const handleKeypress = (e) => { //função de enviar com enter
        if (e.keyCode || e.which === 13) {
            setViewButton(true);
        }
      };
    


    const [, drop] = useDrop(() => ({
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
                {viewButton ? (
                    < button 
                    className="btn-primary"
                    onClick={handleChangeButton} 
                    >
                       {titleGroup}
                   </button> 
                ):(
                    <input
                        type="text"
                        className="btn-primary"
                        placeholder="Digite aqui..."
                        onChange={(e) => setTitleGroup(e.target.value)}
                        onKeyPress={(e) => handleKeypress(e)}
          />
                )}
            </header>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <ul style={{width: '90%'}}>
                    { arrayList.map(card => <Activity key= {card.id} data={card}/>) }
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
                    <CloseModal 
                        onClick={handleCloseNewGroupModal}
                    />
                    <h2>Cadastrar Card</h2>
                    <input 
                    type="text"
                    placeholder="Cadastrar novo Card"
                    onChange={(e) => setTitle(e.target.value)} //pegando o text
                    />
                    <button 
                    type='submit' 
                    onClick={handleNewActivity}

                    >
                        Salvar
                    </button>
                </div>
                
            </Modal>
        </Container>
    )
}