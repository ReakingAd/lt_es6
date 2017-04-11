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
        let ResultDOM = '';
        
        if( this.props.winner === 'x' ){
            ResultDOM = 
                <p>恭喜你获胜！</p>
        }
        else if( this.props.winner === 'o' ){
            ResultDOM = 
                <p>很遗憾你输了。</p>
        }
        else if( this.props.winner === 'draw' ){
            ResultDOM = 
                <p>平局</p>
        }
        return (
            <div className="btn-container clearfloat">
                {ResultDOM}
                <button onClick={this.handleClick}>重新开始</button>
            </div>
        )
    }
}

export default Chessbtns;