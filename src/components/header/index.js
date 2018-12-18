import React, { Component } from 'react';
import styles from './style.css'



class Header extends Component {
    
    constructor(props){
        super(props)
                   
    }
    
    componentDidMount() {        
                 
    }

    componentDidUpdate() {       
        
    } 

    render() {    
        
        return (
            <div className={ styles.component }>
                <header>
                    <h1>Jeu de la Memoire</h1>
                </header>
            </div>
        );
    }
}

export default Header;
