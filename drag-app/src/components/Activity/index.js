import React from "react";
import { useDrag } from 'react-dnd';
import Modal from 'react-modal';
import { Draggable } from 'react-beautiful-dnd'
import { Container, ClockWrapper, ClockButton, Clock, ClockSpan, ClockInput } from './styles';
import { CloseModal } from '../../styles/global';
import { api } from "../../services/api";
import { useState } from 'react';









export default function Activity( { name, id, idGroup, Load , Data, checked} ){
    
    
    const [items, setItems] = useState();


    const removeFromList = (list, index) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
      };
     
      const addToList = (list, index, element) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
      };
     
      const onDragEnd = (result) => {
        if (!result.destination) {
          console.log(result);
          return;
        }
        const listCopy = { ...items };
        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
          sourceList,
          result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
     
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
          destinationList,
          result.destination.index,
          removedElement
        );
        setItems(listCopy);
      };
    
    
    
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

    // const [{isDragging}, drag] = useDrag(() => ({
    //     type:"ACTIVITY",
    //     item: {id: name},
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));

    //Edit Activity
    
    const [newContent, setNewContent] = useState('');
    
    const handleEditActivity = () => {
        if(newContent === ''){
            return;
        }
        api.put(`/activity/${id}`, {
            idGroup: idGroup,
            nameOfActivity: newContent,
        }).then(() => {
            Load();
            handleCloseActivity();
        }) 
    }

    //Set date

    const [viewButton, setViewButton] = useState(true);

    const [dataActivity , setDataActivity] = useState(Data);

    const [newContentData, setNewContentData] = useState('');


    const handleKeypress = (e) => { //função de enviar com enter
        if (e.keyCode || e.which === 13) {
            handleEditDate(dataActivity)
            setViewButton(true);
        }
      };

    const handleChangeButtonDate = () => {
        setViewButton(false);
    }

    const handleEditDate = () => {
        if(newContentData === ''){
            return;
        }
        api.put(`/activity/${id}`, {
            idGroup: idGroup,
            dateOfActivity: newContentData
        }).then((response) => {
            setDataActivity(response.data.dateOfActivity)
        })
    }

    
    return (
        <>      
            <Draggable key={id} draggableId={id} index={idGroup}>
                {(provided) => (
                    <Container 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    // ref={drag}
                    // isDragging={isDragging}
                    // style = {{border: isDragging ? "5px solid rgba(50, 13, 241, 0.4)": "0px"}}
                    onClick = {()=> handleOpenActivity()}
                > 
                    <p>{name}</p>
                     <ClockWrapper>
                
                        {viewButton ? (
                            <>
                                <ClockButton 
                                onClick={handleChangeButtonDate} 
                                >
                                    {dataActivity}
                            </ClockButton>
                                <Clock />
                                <ClockSpan />
                            </>
                        ):(
                            <>
                                <ClockInput 
                                    // type="date"
                                    onChange={(e) => setDataActivity(e.target.value)}
                                    onKeyPress={(e) => handleKeypress(e)}
                                />
                                <Clock />
                                <ClockSpan />
                            </>
                        )}
                
                    </ClockWrapper>

                    {/* <div className="btn-checkbox">
                        <input type="checkbox"/>
                        <span>foda-se</span>
                    </div> */}
                </Container>
                )}          
                
            </Draggable> 
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