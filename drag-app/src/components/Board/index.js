import React, { useState, useEffect } from 'react';
import Group from '../Group';
import { api } from '../../services/api';

import { Container } from './styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Activity from '../Activity';

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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  async function onDragEnd(result) {
    console.log(result);
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        groups[sInd].activities,
        source.index,
        destination.index
      );
      const newgroups = [...groups];
      newgroups[sInd].activities = items;
      setGroups(newgroups);
    } else {
      const result = move(
        groups[sInd].activities,
        groups[dInd].activities,
        source,
        destination
      );
      const newgroups = [...groups];
      newgroups[sInd].activities = result[sInd];
      newgroups[dInd].activities = result[dInd];
      setGroups(newgroups);
    }
  }

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
                {/* <Group
                  name={group.nameOfGroup}
                  idGroup={group.id}
                  activities={group.activities}
                /> */}
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
                        <Activity
                          id={list.id}
                          name={list.nameOfActivity}
                          idGroup={group.id}
                          // Load={loadingActivies}
                          Data={list.dateOfActivity}
                          checked={list.checkList}
                          index={index}
                        />
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
