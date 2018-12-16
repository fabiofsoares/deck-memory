import React, { Component } from 'react';
import Card from '../card'
import styles from './style.css'

class Board extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            deck : [],
            card_1 : undefined,
            point: 0
        }          
    }
    
    componentDidMount() {        
        
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(res => {
            fetch('https://deckofcardsapi.com/api/deck/'+ res.deck_id + '/draw/?count=3')
            .then(response => response.json())
            .then(res => {
                let cards =res.cards.concat(res.cards.slice(0))
                this.setState({
                    deck : this.shuffle(cards)
                })
            });
        });
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    showCards(code, card){
       
        if(this.state.card_1 === undefined){
           
            this.setState({
                card_1: code
            })
        
        }else{

            if(this.state.card_1 === code){
                this.setState({  card_1: undefined, point: this.state.point + 1 })
                console.log('SUUPER')
            
            } else {  
                console.log('PAS BON DU TOUT')              
                this.setState({ card_1: undefined })
               
                setTimeout(()=>{
                    card.setState({visible: false})
                }, 2000)
                
            }
        }
    }

   
    render() {

        return (
            <div className={ styles.component }>
            <h1>Total de points : {this.state.point}</h1>
            {this.state.deck && this.state.deck.map((card, index) => <Card key={index} data={card} action={this.showCards.bind(this)}/>)}
            </div>
        );
    }
}

export default Board;
