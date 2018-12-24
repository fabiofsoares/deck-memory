import React, { Component } from "react";
import Card from "../../components/card";
import styles from "./style.css";
import Panel from "../../components/panel";
// import { createStore } from "redux";
// import { Provider } from 'react-redux';
// import reducer from './reducers';

//  {this.props.dispatch(showC())}
//  {this.props.dispatch(hideC())}
// function showC() {
//   return {
//     type: 'SHOW'
//   }
// }

// function hideC() {
//   return {
//    type: 'HIDE'
//   }
// }
let nbr_cards = 3;

class Board extends Component {
  constructor(props) {
    super(props);
    
    this.state = {      
        deck: [],
        allCards: [],     
        players: this.props.players,
        card: {},
        card_code: undefined,
        message: "",
        total: 0
    }
  }

    componentDidMount() {
        this.start()    
    }

    componentDidUpdate() {       
       this.winner()
    }

    start() {
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(res => {
            fetch(
            "https://deckofcardsapi.com/api/deck/" +
                res.deck_id +
                "/draw/?count=" +
                nbr_cards
            )
            .then(response => response.json())
            .then(res => {
                let cards = res.cards.concat(res.cards.slice(0));
                this.setState(state => {
                    const players = state.players.map((player, j) => {
                        return player = { name: player.name, point: 0, tour: player.tour };
                    });
                    return {
                        deck: this.shuffle(cards),
                        card_code: undefined,
                        players: players,
                        card: {},
                        message: ""
                    };
                }, () => {
                    this.state.allCards &&
                    this.state.allCards.map(item => {
                        item.setState({
                        visible: false
                        });
                    });
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

    winner(){        
        if(this.state.total === nbr_cards){
           console.log('FIN DE JEU')           
        }
    }

    /** Function redux **/

    play(code, card) {
    
        this.setState({ allCards: [...this.state.allCards, card] });
        
        if (this.state.card_code === undefined) {
            
            this.setState({
                card_code: code,
                card: card
            });
        
        } else {
            
            if (this.state.card_code === code) {       
            
                this.setState(state => {
                    
                    const players = state.players.map((player, j) => {
                        if (player.tour) {
                            return player = { name: player.name, point: player.point + 1, tour: true };
                        } else {
                            return player;
                        }
                    });
            
                    return {
                        card_code: undefined,
                        players: players,
                        total: state.total + 1
                    };
                })
    
            } else {
                
                setTimeout(() => {
                    this.state.card.setState({ visible: false });
                    card.setState({ visible: false });
                    this.setState(state => {
                        const players = state.players.map((player, j) => {
                            return player = { name: player.name, point: player.point, tour: !player.tour };
                        });
                        return {
                            card_code: undefined,
                            players: players,
                            card: {},
                        };
                    })

                }, 1000);
            }
        }
    }

  render() {
    
    return (
      <div className={(this.props.visible ? "visible " : "") + styles.component} >        
        
        <main>
            
            <div className="board right">
                {
                    this.state.deck &&
                    this.state.deck.map((card, index) => (
                        <Card key={index} data={card} game={this.play.bind(this)} />
                    ))
                }
            </div>

            <div className="actions-players left">
                <p>{this.state.message}</p>
                <Panel status={this.state.st} players={ this.state.players && this.state.players } />
                <button onClick={ this.start.bind(this) }>Recommencer</button>
            </div>

        </main>
      </div>
    );
  }
}

export default Board;
