import React, { useState, useEffect } from 'react';
import Group from '../Group';
import { api } from '../../services/api';

import { Container } from './styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Board() {
  const [items, setItems] = useState([]);

  const [createGroup, setCreateGroup] = useState(true);
  const [title, setTitle] = useState('');

  const [groups, setGroups] = useState([]);

  const [activities, setActivities] = useState([]);

  //Draggable and Dropable
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
      groups.activities.map((activity) => console.log(activity.nameOfActivit));
      return;
    }
    console.log(result);
    const listCopy = { ...activities };
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

  useEffect(() => {
    loadGroup();
  }, []);

  //Carrega as ativs
  const loadGroup = () => {
    api.get('/group').then((response) => {
      setGroups(response.data);
      console.log(response.data);
    });
  };

  function handleCreateGroup() {
    setCreateGroup(false);
  }

  const handleKeypress = (e) => {
    //função de enviar com enter
    if (e.keyCode || e.which === 13) {
      handleCreateNewGroup(title);
      setCreateGroup(true);
    }
  };

  const handleCreateNewGroup = (value) => {
    if (value === '') {
      return;
    }
    api
      .post(`/group/`, {
        nameOfGroup: value,
      })
      .then(() => {
        loadGroup();
        setTitle('');
      }); //carregando o estado novamente
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {groups.map((group, index) => (
        <Droppable
          droppableId={String(index)}
          type="list"
          direction="horizontal"
          key={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="MyBoard"
            >
              <Container>
                {group.activities.map((list, index) => (
                  <Draggable
                    draggableId={String(list.id)}
                    index={index}
                    key={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {/* <Group name={list.nameOfGroup} idGroup={list.idGroup} /> */}
                        {list.nameOfActivity}
                      </div>
                    )}
                  </Draggable>
                ))}
                {createGroup ? (
                  <button
                    className="btn-new-group"
                    style={{ width: '260px', height: '50px', margin: '25px' }}
                    onClick={handleCreateGroup}
                  >
                    Novo Grupo +
                  </button>
                ) : (
                  <input
                    type="text"
                    placeholder="Digite aqui..."
                    className="input-new-group"
                    style={{ width: '260px', height: '50px', margin: '25px' }}
                    onChange={(e) => setTitle(e.target.value)} //pegando o text
                    onKeyPress={(e) => handleKeypress(e)}
                  />
                )}
              </Container>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}
