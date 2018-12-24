import React, { Component } from 'react';
import styles from './style.css'

class Player extends Component {
    
    constructor(props){        
        super()                   
    }
    
    componentDidMount() {        
                 
    }

    componentDidUpdate() {       
       
    }

    render() {    
       
        return (
            <div className={ styles.component }>
                <div className={(this.props.duo && this.props.tour ? 'duo active' : 'duo') + ' player'}>
                    <div>Player : {this.props.name}</div>
                    <div>Points : {this.props.point}</div>
                </div>
            </div>
        );
    }
}

export default Player;
