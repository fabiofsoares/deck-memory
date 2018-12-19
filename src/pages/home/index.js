import React, { Component } from 'react';
import styles from './style.css'


class Home extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            single: '',
            duo_1: '',
            duo_2: '',
            visible: true
        }
    }  

    componentDidUpdate() {       
        
    }
    
    getStart(e){
       
        if(this.refs.single_player.value !== ''){
            this.setState({
               single: this.refs.single_player.value,
               visible: false
            }, () => {
                this.props.play(this.state)                
            })

        } else {
            this.setState({
                duo_1: this.refs.duo_player_1.value,
                duo_2: this.refs.duo_player_2.value,
                visible: false
            }, () => {
                this.props.play(this.state)    
            })
        }
        
    }

    render() {   
        
        return (
            <div className={ styles.component + (this.state.visible ? ' visible' : '') }>
                
                <div className="content">                    
                    <main>                        
                        <div className="content-single">
                            <button>Single</button>
                            <div className="from">
                                <div className="input-container">
                                    <label>Player :</label><br/>
                                    <input type="text" name="single_player" ref="single_player" />
                                </div>
                                <button onClick={ this.getStart.bind(this) } >GO</button>
                            </div>
                        </div>
                        
                        <div className="content-Duo">
                            <button>Duo Player</button>
                            <div className="from">
                                <div className="input-container">
                                    <label>Player 1 :</label><br/>
                                    <input type="text" name="duo_player_1" ref="duo_player_1" />
                                </div>
                                <div className="input-container">
                                    <label>Player 2 :</label><br/>
                                    <input type="text" name="duo_player_2" ref="duo_player_2" />
                                </div>
                                <button onClick={ this.getStart.bind(this) }>GO</button>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        );
    }
}

export default Home;
