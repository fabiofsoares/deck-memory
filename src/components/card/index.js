import React, { Component } from 'react';
import styles from './style.css'

class Card extends Component {
    constructor(props){
        super(props)
        this.state = {           
            visible: false
        }
    }
    showCard(){
        this.setState({
            visible: !this.state.visible
        })
        console.log(this.props)
        //this.props.showCards(this.props.code)
        this.props.action(this.props.data.code, this)
    }
    render() {
        console.log(this.state.visible)
        return (
            <div className={ styles.component + (this.state.visible ? ' visible' : '') } onClick={ this.showCard.bind(this) }>
                <h1>code : {this.props.data.code}</h1>
                <h2>suit : {this.props.data.suit}</h2>
                <h2>value : {this.props.data.value}</h2>
            </div>
        );
    }
}

export default Card;
