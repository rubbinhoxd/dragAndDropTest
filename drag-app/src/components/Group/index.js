import React, { useEffect } from 'react';
import { Container } from './styles';
import Activity from '../Activity';
import { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from 'react-modal';
import { CloseModal } from '../../styles/global';
import { api } from '../../services/api';

export default function Group({ name, idGroup, activities }) {
  //Editing group in title
  const [viewButton, setViewButton] = useState(true);
  const [titleGroup, setTitleGroup] = useState(name);
  const [title, setTitle] = useState('');
  const [arrayList, setArrayList] = useState([]);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

  useEffect(() => {
    loadingActivies();
  }, []);

  const loadingActivies = async () => {
    const activitys = activities.map((activity) => {
      if (!activity.dateOfActivity) return { ...activity };

      const date = new Date(activity.dateOfActivity);
      date.setDate(date.getDate() + 1);

      return {
        ...activity,
        dateOfActivity: date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      };
    });
    setArrayList(activitys);
  };

  function handleChangeButton() {
    setViewButton(false);
  }
  //Modal of button 'New Card'

  function handleOpenNewGroupModal() {
    setIsNewGroupModalOpen(true); //modal aberto
  }

  function handleCloseNewGroupModal() {
    setIsNewGroupModalOpen(false); //modal fechado
  }
  //add new activity

  const handleKeypress = (e) => {
    //função de enviar com enter
    if (e.keyCode || e.which === 13) {
      handleUpdateTitle(titleGroup);
      setViewButton(true);
    }
  };

  // const [, drop] = useDrop(() => ({
  //     accept: "ACTIVITY",
  //     drop: (item) => addActivityToGroup(item.id),
  //     collect: (monitor) => ({
  //         isOver: !!monitor.isOver(),
  //     }),
  // }));

  const addActivityToGroup = (id) => {
    console.log(id);
    // const listActivity = listActivity.filter((activity) => id === activity.id)
  };

  const handleUpdateTitle = (value) => {
    api
      .put(`/group/${idGroup}`, {
        nameOfGroup: value,
      })
      .then((response) => {
        setTitleGroup(response.data.nameOfGroup);
      });
  };

  const handleAddNewActivity = () => {
    api
      .post(`/activity`, {
        nameOfActivity: title,
        idGroup: idGroup,
      })
      .then(() => {
        loadingActivies();
        handleCloseNewGroupModal();
      });
  };

  return (
    <>
      <Container>
        <header>
          {viewButton ? (
            <button className="btn-primary" onClick={handleChangeButton}>
              {titleGroup}
            </button>
          ) : (
            <input
              type="text"
              className="btn-primary"
              placeholder="Digite aqui..."
              onChange={(e) => setTitleGroup(e.target.value)}
              onKeyPress={(e) => handleKeypress(e)}
            />
          )}
        </header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul style={{ width: '90%' }}>
            {arrayList.map((list, index) => (
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
                      idGroup={idGroup}
                      // Load={loadingActivies}
                      Data={list.dateOfActivity}
                      checked={list.checkList}
                      index={index}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </ul>
        </div>
        <button class="btn-secundary" onClick={handleOpenNewGroupModal}>
          Novo Card +
        </button>
      </Container>

      <Modal
        isOpen={isNewGroupModalOpen}
        onRequestClose={handleCloseNewGroupModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <div className="modalGroup">
          <CloseModal onClick={handleCloseNewGroupModal} />
          <h2>Cadastrar Card</h2>
          <input
            type="text"
            placeholder="Cadastrar novo Card"
            onChange={(e) => setTitle(e.target.value)} //pegando o text
          />
          <button type="submit" onClick={handleAddNewActivity}>
            Salvar
          </button>
        </div>
      </Modal>
    </>
  );
}
