import React, { Component } from 'react';
import styles from './style.css'
import Player from '../player'

class Panel extends Component {
    
    constructor(props){
        super()
    }
    
    componentDidMount() {        
                 
    }

    componentDidUpdate() {       
              
    }
   
    render() {        
        let duo = this.props.players.length === 2 ? true : false
        let players = this.props.players.map((player, index) => <Player key={index} name={player.name} tour={player.tour} point={player.point} duo={duo}/>)
        
        return (
            <div className={ styles.component }>
                <div className="panel">
                    { players }
                </div>
            </div>
        );
    }
}

export default Panel;
