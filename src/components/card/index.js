import React, { Component } from 'react';
import styles from './style.css'

class Card extends Component {
    
    constructor(props){
        super(props)
        this.state = {           
            visible: false
        }        
    }

    showCard() {
        this.setState({
            visible: !this.state.visible
        })        
        this.props.game( this.props.data.code, this )
    }


    render() {              
        return (
            <div className={ styles.component + (this.state.visible ? ' visible' : '') } onClick={ this.showCard.bind(this) }>
                <div className="card" id={ this.props.data.code }>
                    <img src={ this.props.data.image } alt=""/>
                </div>
            </div>
        );
    }
}

export default Card;
