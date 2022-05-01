import React, { useState, useEffect } from 'react';
import Group from '../Group';
import { loadLists} from '../../services/api';
import { api } from "../../services/api";

import { Container } from './styles';

// const lists = loadLists();

export default function Board() {

    //Add a group
    
    const [createGroup, setCreateGroup] = useState(true);
    const [title, setTitle] = useState('');

    const [arrayList, setArrayList] = useState([]);


    useEffect(() => {
        loadGroup()
    }, [])

    const loadGroup = () => {
        api.get("/group").then((response) => {
            setArrayList(response.data);
        })
    }


    function handleCreateGroup(){
        setCreateGroup(false);
    }

    const handleKeypress = (e) => { //função de enviar com enter
        if (e.keyCode || e.which === 13) {
            
            handleCreateNewGroup(title);
            setCreateGroup(true);
        }
      };

      const handleCreateNewGroup = (value) => {
        if(value === ''){
            return;
        }
        api.post(`/group/`, {
            nameOfGroup: value
        }).then(() => {
            loadGroup();
            setTitle('');
        }); //carregando o estado novamente
      }

    return (
        <Container>
            {arrayList.map(list => <Group id={list.id} name={list.nameOfGroup} />)}
            {createGroup ? (
                <button 
                style={{width:'260px', height:'50px', margin:'25px'}}
                onClick={handleCreateGroup}
                >
                    Novo Grupo +
                </button>
            ): (
                <input
                    type="text"
                    placeholder="Digite aqui..."
                    className= "input-new-group"
                    style={{width:'260px', height:'50px', margin:'25px'}}
                    onChange={(e) => setTitle(e.target.value)} //pegando o text
                    onKeyPress={(e) => handleKeypress(e)}
                 />
            )   
            }
            
        </Container>
    )

}