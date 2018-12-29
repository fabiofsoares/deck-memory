import React, { Component } from 'react';
import Home from './pages/home'
import Board from './pages/board'
import Header from './components/header'
import {createStore} from "redux";

const createStore = Redux.createStore(reducer);

class App extends Component {
    constructor(props){
    
        super(props)
        
        this.state = {
            board: false,
            players: []          
        }
       
    }
    play(player){        
      
        if(player.duo){
            this.setState({               
                players:[
                    {
                        name: player.player_1,
                        point: 0,
                        tour: true
                    },
                    {
                        name: player.player_2,
                        point: 0,
                        tour: false
                    }
                ]
            }, () => {
                //Function REDUX TODO
                const reducer = (state = this.state.board, action) => {
                    if (action.type === 'BOARD'){
                        return (this.setState({board: true}))
                    }
                    return state;
                }
            })
        } else {
            this.setState({                
                players:[
                    {
                        name: player.player_1,
                        point: 0,
                        tour: true
                    }
                ]
            }, ()=>{
                //Function REDUX TODO
                const reducer = (state = this.state.board, action) => {
                    if (action.type === 'BOARD'){
                        return (this.setState({board: true}))
                    }
                    return state;
                }
            })
        }   
    }

    render() {
        
        return (
            <div className="App">                
                
                <Header /> 
                <Home play={ this.play.bind(this) }/>               
                {  this.state.board && <Board players={ this.state.players  } /> }
                    
            </div>
        );
    }
}

export default App;

const boardAction = () => {
  return {
    type: 'BOARD'
  }
};