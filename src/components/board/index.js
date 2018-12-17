import React, { Component } from 'react';
import Card from '../card'
import styles from './style.css'

let  time = ''
let  nbr_cards = 3

class Board extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            deck : [],
            card_code : undefined,
            card: {},
            point: 0,
            game_over: false,
            timing: 0
        }              
    }
    
    componentDidMount() {        
        this.start()
        time = setInterval(() => {
            this.setState({
                timing: this.state.timing + 1
            })

        }, 1000)       
    }

    componentDidUpdate() {
        
        if(this.state.point === nbr_cards){
            console.log('JEU GAGNE')
            clearInterval(time)
        }
        
    }
    
    start(){
        
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(res => {
            fetch('https://deckofcardsapi.com/api/deck/'+ res.deck_id + '/draw/?count=' + nbr_cards)
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
       
        if(this.state.card_code === undefined){
           
            this.setState({
                card_code: code,
                card: card
            })
        
        } else{            
            if(this.state.card_code === code){
                
                this.setState({  card_code: undefined, point: this.state.point + 1 })                
            
            } else {                     
                setTimeout(()=>{
                    this.state.card.setState({ visible: false })
                    card.setState({visible: false})
                    this.setState({ card_code: undefined, card: {} })
                }, 1500)
                
            }
        }
    }

   
    render() {
        

        return (
            <div className={ styles.component }>
            <h1>Total de points : {this.state.point}</h1>
            <button onClick={ this.start.bind(this) }>RECOMMENCER</button> 
            <div>TIME : { this.state.timing }</div>
            <main>
            {this.state.deck && this.state.deck.map((card, index) => <Card key={index} data={card} action={this.showCards.bind(this)}/>)}
            </main>
            </div>
        );
    }
}

export default Board;
