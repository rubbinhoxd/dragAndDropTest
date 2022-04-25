import React from 'react';
import { Container } from './styles';
import Activity from '../Activity';

export default function Group( { data }){
    


    return(
        <Container>
            <header>
                <button className="btn-primary">{data.title}</button>
            </header>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <ul style={{width: '90%'}}>
                    { data.cards.map(card => <Activity key= {card.id} data={card}/>) }
                </ul>
            </div>
            <button class="btn-secundary">Novo Card +</button>
        </Container>
    )
}