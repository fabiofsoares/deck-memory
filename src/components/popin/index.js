import React, { Component } from 'react';
import styles from './style.css'



class Popin extends Component {
    
    constructor(props){
        super()
                   
    }
    
    componentDidMount() {        
                 
    }

    componentDidUpdate() {       
        
    }
    play(){
        this.props.recommencer()
    } 

    render() {    
        
        return (
            <div className={ styles.component }>
                <div className='pop-up'>
                    <h1>FIN DU JEU !!</h1>
                    <p>{this.props.player}</p>
                    <button onClick={this.play.bind(this)}>Recommencer</button>
                </div>
            </div>
        );
    }
}

export default Popin;
