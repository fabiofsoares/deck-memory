import React, { Component } from 'react';
import Home from './pages/home'
import Board from './pages/board'
import Header from './components/header'

class App extends Component {
    constructor(props){
    
        super(props)
        
        this.state = {
            start: false,
            players: []          
        }
    }
    play(player){        
        this.setState({
            start: true,
            players: player
        })
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Home play={ this.play.bind(this) }/>
                <Board data={ this.state } />       
            </div>
        );
    }
}

export default App;
