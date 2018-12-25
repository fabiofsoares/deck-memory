import React, { Component } from 'react';
import Home from './pages/home'
import Board from './pages/board'
import Header from './components/header'

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
                this.setState({board: true})
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
                this.setState({board: true})
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
