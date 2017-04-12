import React,{Component} from 'react';

class Chessbtns extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.restartChess();
    }
    render(){
        return (
            <div className="btn-container clearfloat">
                <button onClick={this.handleClick}>重新开始</button>
            </div>
        )
    }
}

export default Chessbtns;