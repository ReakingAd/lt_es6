import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header.jsx';
import Clock from './components/clock.jsx';
import Calculator from './components/Calculator.jsx';
import Tictactoe from './components/tictactoe/Tictactoe.jsx';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:''
        };
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(msg){
        this.setState({
            result:msg
        })
    }
    render(){
        return (
            <div className="main-container">
                <Clock date={new Date()} />
                <Tictactoe />
            </div>
        )
    }
}

ReactDom.render(
    <Main />,
    document.getElementById('content')
)