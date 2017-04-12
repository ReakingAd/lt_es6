import React,{ Component } from 'react';

class Gameinfo extends Component{
    constructor(props){
        super(props);
        this.calcTurn = this.calcTurn.bind(this);
    }
    calcTurn(){
        let isMyTurn   = this.props.isMyTurn;
        let winner     = this.props.winner;
        let role       = this.props.role;
        let otherRole  = this.props.getOtherRole( role );
        let noticeWord = '';

        if( winner ){
            if( winner === role ){
                noticeWord = '恭喜你获胜！'
            }
            else if( winner === otherRole ){
                noticeWord = '很遗憾你输了'
            }
            else if( winner === 'draw' ){
                noticeWord = '平局'
            }
        }
        else{
            if( isMyTurn ){
                noticeWord = '请落子..';
            }
            else{
                noticeWord = '请等待对方落子..';
            }
        }
        return noticeWord;
    }
    render(){
        return (
            <div className="game-info"> 
                {this.calcTurn()}
            </div>
        )
    }
}

export default Gameinfo;