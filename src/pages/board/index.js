import React, { Component } from "react";
import Card from "../../components/card";
import styles from "./style.css";
// import { createStore } from "redux";
// import { Provider } from 'react-redux';
// import reducer from './reducers';

let nbr_cards = 3;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      allCards: [],
      card: {},
      card_code: undefined,
      paused: false,
      message: "",
      tour: false,
      single: false,
      point_1: 0,
      point_2: 0
    };
  }

  componentDidMount() {
    this.start();
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
            this.setState(
              {
                deck: this.shuffle(cards),
                card: {},
                point_1: 0,
                point_2: 0,
                message: ""
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

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  /** Function redux **/

  showCards(code, card) {
    this.setState({ allCards: [...this.state.allCards, card] });

    if (this.state.card_code === undefined) {
      this.setState({
        card_code: code,
        card: card
      });
    } else {
      if (this.state.card_code === code) {
        if (this.state.single) {
          this.setState(
            { card_code: undefined, point_1: this.state.point_1 + 1 },
            () => {
              if (this.state.point === nbr_cards) {
                this.setState({ card_code: undefined, card: {} });
              }
            }
          );
        } else {
          if (this.state.tour) {
            this.setState(
              { card_code: undefined, point_2: this.state.point_2 + 1 },
              () => {
                if (this.state.point === nbr_cards) {
                  this.setState({ card_code: undefined, card: {} });
                }
              }
            );
          } else {
            this.setState(
              { card_code: undefined, point_1: this.state.point_1 + 1 },
              () => {
                if (this.state.point === nbr_cards) {
                  this.setState({ card_code: undefined, card: {} });
                }
              }
            );
          }
        }

        this.setState({ message: "super.. vous avez gagné !" });
      } else {
        setTimeout(() => {
          this.state.card.setState({ visible: false });
          card.setState({ visible: false });
          this.setState({
            card_code: undefined,
            card: {},
            tour: !this.state.tour
          });
        }, 1500);
      }
    }
  }
  constructPanel() {
    let panel = "";

    if (this.props.data.players.single) {
      panel = (
        <div className="panel-content">
          <div className="player player_1">
            <div>Player 1 : {this.props.data.players.single}</div>
            <div>Points : {this.state.point_1}</div>
          </div>
        </div>
      );
    } else {
      panel = (
        <div className="panel-content">
          <div
            className={"player player_1 " + (!this.state.tour ? "tour" : "")}
          >
            <div>Player 1 : {this.props.data.players.duo_1}</div>
            <div>Points : {this.state.point_1}</div>
          </div>
          <div className={"player player_2 " + (this.state.tour ? "tour" : "")}>
            <div>Player 2 : {this.props.data.players.duo_2}</div>
            <div>Points : {this.state.point_2}</div>
          </div>
        </div>
      );
    }
    return panel;
  }

  render() {
    return (
      <div
        className={(this.props.data.start ? "active " : "") + styles.component}
      >
        <h3>
          {this.props.data.players.single
            ? this.props.data.players.single
            : this.state.tour
            ? this.props.data.players.duo_2
            : this.props.data.players.duo_1}
        </h3>
        <main>
          <div className="board right">
            {this.state.deck &&
              this.state.deck.map((card, index) => (
                <Card
                  key={index}
                  data={card}
                  action={this.showCards.bind(this)}
                />
              ))}
          </div>

          <div className="actions-players left">
            <div className="action message">
              <p>{this.state.message}</p>
            </div>
            <div className="panel"> {this.constructPanel()} </div>
            <div className="action play">
              <button onClick={this.start.bind(this)}>RECOMMENCER</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Board;
