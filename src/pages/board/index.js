import React, { Component } from 'react';
import Card from '../../components/card'
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
            paused: false,
            timing: 0,
            message: '',
            allCards: [],
            tour: false,
            single: false,
            players:{}
        }              
    }
    
    componentDidMount() {        
        this.start()
        //this.timing()              
    }

    componentDidUpdate() {       
        
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
                    deck : this.shuffle(cards),
                    card: {},
                    timing: 0,
                    point: 0,
                    message: ''                    
                },() => {                                      
                    this.state.allCards && this.state.allCards.map((item) => {
                        item.setState({
                            visible: false
                        })
                    })                  
                })
            });
        });       
        
    }
    
    players(){
        if(this.props.data.players.single){
            this.setState({
                single: true,
                players: {                   
                    player_1: this.props.data.players.single,
                    point_1: 0
                }
            })
        } else {
            this.setState({
                single: false,
                players: {                    
                    player_1: this.props.data.players.duo_1,
                    point_1: 0,
                    player_2: this.props.data.players.duo_2,
                    point_2: 0
                }
            })

        }
    }

    pause() {       
        this.state.paused ? this.timing() : clearInterval(time)
        this.setState({
            paused: !this.state.paused
        })
    }    

    timing(){
        time = setInterval(() => {
            this.setState({
                timing: this.state.timing + 1
            })

        }, 1000)
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    showCards(code, card){        
        
        this.setState({ allCards : [...this.state.allCards, card] })
        
        if(this.state.card_code === undefined){

            this.setState({
                card_code: code,
                card: card
            })
        
        } else{            
            
            if(this.state.card_code === code){                
                this.setState({  card_code: undefined, point: this.state.point + 1 }, () => {
                    if(this.state.point === nbr_cards){
                        clearInterval(time)
                        this.setState({ card_code: undefined, card: {}, message: 'super.. vous avez gagné !' })
                    }
                })

            } else {                     
                setTimeout(()=>{
                    this.state.card.setState({ visible: false })
                    card.setState({visible: false})
                    this.setState({ card_code: undefined, card: {}, tour: !this.state.tour })
                }, 1500)                
            }
        }    
        
    }

   
    render() {          
        return (
            <div className={ (this.props.data.start ? 'active ' : '') + styles.component }>                
                <h3>{ this.props.data.players.single ? this.props.data.players.single : ( this.state.tour ? this.props.data.players.duo_2 : this.props.data.players.duo_1 )}</h3>           
                <main>
                    
                    <div className="board right">
                        { this.state.deck && this.state.deck.map((card, index) => <Card key={ index } data={card} action={this.showCards.bind(this)} />)  }                        
                    </div>
                    
                    <div className="actions-players left">
                        <div className="action points">
                            <p>Total de points : <span>{this.state.point}</span></p>
                        </div>
                        <div className="action message">
                            <p>{ this.state.message }</p>
                        </div>
                        <div className="action timing ">
                            <p>TIME : <span>{ this.state.timing }</span></p>
                        </div>
                        <div className="action play">
                            <button onClick={ this.start.bind(this) }>RECOMMENCER</button>
                            <button onClick={ this.pause.bind(this) }>{ this.state.paused ? 'PLAY' : 'PAUSE' }</button>
                        </div>
                    </div>

                </main>
            </div>
        );
    }
}

export default Board;
