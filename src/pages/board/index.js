import React, { Component } from "react";
import styles from "./style.css";
import Card from "../../components/card";
import Panel from "../../components/panel";
import Popin from "../../components/popin";
import { createStore } from "redux";
// ajouter cette action pour la board -> clic
const boardAction = () => {
  return {
    type: "BOARD"
  };
};

let nbr_cards = 10;

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: [],
      allCards: [],
      players: this.props.players,
      card: {},
      card_code: undefined,
      total: 0,
      winner: { point: 0 }
    };
  }

  componentDidMount() {
    this.start();
  }

  componentDidUpdate() {}

  /** Appel API / Recommencer le jeu **/
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
            this.setState(
              state => {
                const players = state.players.map((player, j) => {
                  return (player = {
                    name: player.name,
                    point: 0,
                    tour: player.tour
                  });
                });
                return {
                  deck: this.shuffle(cards),
                  card_code: undefined,
                  players: players,
                  card: {},
                  winner: { point: 0 },
                  total: 0
                };
              },
              () => {
                this.state.allCards &&
                  this.state.allCards.map(item => {
                    item.setState({
                      visible: false
                    });
                  });
              }
            );
          });
      });
  }

  /** Melange les cartes **/
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Montre le gagnant**/
  winner() {
    this.state.players.map((player, i) => {
      if (player.point > this.state.winner.point) {
        this.setState({
          winner: player
        });
      }
    });
    return (
      <Popin player={this.state.winner} recommencer={this.start.bind(this)} />
    );
  }

  /** Logique du Jeu **/
  play(code, card) {
    /** Garde tous les cartes dans un array pour faire des modifications sur le DOM après **/
    this.setState({ allCards: [...this.state.allCards, card] });

    //Piocher la première carte
    if (this.state.card_code === undefined) {
      this.setState({
        card_code: code,
        card: card
      });
    } else {
      //Comparer le code de la première carte avec la deuxième
      if (this.state.card_code === code) {
        this.setState(state => {
          let players = {};

          //S'il y a plus de 2 joeueurs, il y a les regles de tour
          if (state.players.length === 2) {
            players = state.players.map((player, j) => {
              //Ajoute de point au joueur avec le tour active
              if (player.tour) {
                return (player = {
                  name: player.name,
                  point: player.point + 1,
                  tour: true
                });
              } else {
                return player;
              }
            });
          } else {
            //Ajoute de point au joueur seul
            players = state.players.map((player, j) => {
              return (player = {
                name: player.name,
                point: player.point + 1,
                tour: true
              });
            });
          }

          return {
            card_code: undefined,
            players: players,
            total: state.total + 1
          };
        });
      } else {
        setTimeout(() => {
          //Si les deux cartes ne sont pas pareils, tous les valeurs se resetent
          this.state.card.setState({ visible: false });
          card.setState({ visible: false });
          this.setState(state => {
            const players = state.players.map((player, j) => {
              //les tours changent
              return (player = {
                name: player.name,
                point: player.point,
                tour: !player.tour
              });
            });
            return {
              card_code: undefined,
              players: players,
              card: {}
            };
          });
        }, 1000);
      }
    }
  }

  render() {
    return (
      <div className={styles.component}>
        <main>
          <div className="board right">
            {this.state.deck &&
              this.state.deck.map((card, index) => (
                <Card key={index} data={card} game={this.play.bind(this)} />
              ))}
          </div>

          <div className="actions-players left">
            <Panel players={this.state.players} />
            <button onClick={this.start.bind(this)}>Recommencer</button>
          </div>
        </main>

        {this.state.total === nbr_cards && this.winner()}
      </div>
    );
  }
}

export default Board;
