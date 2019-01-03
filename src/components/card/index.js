import React, { Component } from 'react';
import styles from './style.css'

class Card extends Component {
    
    constructor(props){
        super(props)
        this.state = {           
            visible: false
        }        
    }
    showC() {
    return {
        type: "SHOW"
    };
    }
    showCIfOdd() {
    return (dispatch, getState) => {
        const card = this.card.state();

        if (card === false) {
        return;
        }

        dispatch(showC());
    };
    }

  hideC() {
    return {
        type: "HIDE"
    };
    }
    hideIfTrue() {
    return (dispatch, getState) => {
        const card = this.card.state();

        if (card === false) {
        return;
        }

        dispatch(hideC());
    };
    }
    showCard() {
        this.setState({
            visible: !this.state.visible
        })        
        this.props.game( this.props.data.code, this )
    }
    //ajouter cette action pour le clic
    //  {this.props.dispatch(showCIfOdd())}
    //  {this.props.dispatch(hideC())}

    render() {              
        return (
            <div className={ styles.component + (this.state.visible ? ' visible' : '') } onClick={ this.props.dispatch(showCIfOdd())} >
                <div className="card" id={ this.props.data.code }>
                    <img src={ this.props.data.image } alt=""/>
                </div>
            </div>
        );
    }
}

export default Card;
