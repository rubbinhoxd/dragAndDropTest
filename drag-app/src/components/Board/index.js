import React, { useState } from 'react';
import Group from '../Group';
import { loadLists} from '../../services/api';


import { Container } from './styles';

const lists = loadLists();

export default function Board() {

    //Add a group
    
    const [createGroup, setCreateGroup] = useState(true);
    const [title, setTitle] = useState('');

    const [arrayList, setArrayList] = useState(lists);

    function handleCreateGroup(){
        setCreateGroup(false);
    }

    const handleKeypress = (e) => { //função de enviar com enter
        if (e.keyCode || e.which === 13) {
            const data = {
                title: title,
                createTable: true,
                cards: [],
            }
            setTitle('');
            setCreateGroup(true);
            setArrayList([...arrayList, data]); //adicionando os que ja existem + data
        }
      };

    return (
        <Container>
            {arrayList.map(list => <Group key={list.title} data={list} />)}
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