import React, { Component } from 'react';
import styles from './style.css'
const boardAction = () => {
  return {
    type: "BOARD"
  };
};

class Home extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {           
            visible: true,
            duo: false,           
            player_1: '',
            player_2: ''
        }
    }  

    componentDidUpdate() {       
        
    }
    
    start(){

        if(this.state.duo){
            
            this.setState({

                visible: false,
                player_1: this.refs.player_1.value,
                player_2: this.refs.player_2.value

            }, () => this.props.play(this.state))

        } else {
            
            this.setState({

                visible: false,
                player_1: this.refs.player_1.value

            }, () => this.props.play(this.state))
        }
       
         
        
    }
    duo(){
        this.setState({
            duo: !this.state.duo
        })
    }

    render() {   
        
        return (
            <div className={ styles.component + (this.state.visible ? ' visible' : '') }>                
                <div className="content">                    
                    <div className='form-main'>
                        <div className='players player-1'>
                            <label>Player 1 : <br />
                                <input type='text' ref='player_1' />
                            </label>
                        </div>
                        <div className={(this.state.duo ? 'visible' : '') + ' players player-2'}>
                            <label>Player 2 : <br />
                                <input type='text' ref='player_2' />
                            </label>
                        </div>
                        <button className="plus" onClick={ this.duo.bind(this)}>+</button>
                        <button className="start" onClick={ this.start.bind(this).then(this.props.dispatch({ type: boardAction })) }>Start</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
