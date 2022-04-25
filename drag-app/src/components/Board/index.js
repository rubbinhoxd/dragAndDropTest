import React from 'react';
import Group from '../Group';
import { loadLists} from '../../services/api';


import { Container } from './styles';

const lists = loadLists();

export default function Board() {

    return (
        <Container>
            {lists.map(list => <Group key={list.title} data={list} />)}
        </Container>
    )

}