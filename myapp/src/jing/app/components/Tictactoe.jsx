import React,{ Component } from 'react';
import Grid from './Grid.jsx';
import Utils from './Utils.js';
import Chessbtns from './Chessbtns.jsx';
import Pubsub from './Pubsub.js';

class Tictactoe extends Component{
    constructor(props){
        super(props);
        this.init();
        this.handlePlayerStep = this.handlePlayerStep.bind(this);
        this.botAction        = this.botAction.bind(this);
        this.judgeResult      = this.judgeResult.bind(this);
        this.restartChess     = this.restartChess.bind(this);
        this.state = {
            gridStatus:['blank','blank','blank','blank','blank','blank','blank','blank','blank'],
            winner:'',
            waitingFor:'x'
        }
    }
    // Pubsub订阅事件
    init(){
        Pubsub.listen('xDone',() => {
            this.judgeResult();
        });
        Pubsub.listen('judgeDone',() => {
            if( !this.state.winner ){
                if( this.state.waitingFor === 'o' ){
                    this.botAction();
                }
            }
        });
        Pubsub.listen('oDone',() => {
            this.judgeResult();
        })
    }
    // 重新开始游戏
    restartChess(){
        this.setState({
            gridStatus:['blank','blank','blank','blank','blank','blank','blank','blank','blank'],
            winner:'',
            waitingFor:'x'
        })
    }
    // 玩家x下棋后，回调
    handlePlayerStep(clickedKey){
        let _num = Utils.calcNum(clickedKey);

        this.state.gridStatus[ _num - 1 ] = 'x'
        this.setState({
            gridStatus:this.state.gridStatus,
            waitingFor:'o'
        },() => {
            Pubsub.trigger('xDone');
        })
    }
    // AI 下棋
    botAction(){
        let _gridStatus = this.state.gridStatus;

        for( let item of _gridStatus ){
            if( item === 'blank' ){
                let index = _gridStatus.indexOf( item );
                _gridStatus[ index ] = 'o';
                break;
            }
        }
        this.setState({
            gridStatus:_gridStatus,
            waitingFor:'x'
        },() => {
            Pubsub.trigger('oDone');
        })
    }
    /**
     * @desc 判断胜负结果。
     *          判断依据一（直线）：将x和o的棋子所在横纵坐标分别放入不同数组，当某个值在数组中出现3次时，表名连成了横线或竖线。则当前棋子方获胜
     *          判断依据二（斜线）：
     */
    judgeResult(){
        let [ xCoord,oCoord ] = [ [],[] ];
        let [ xNum,oNum ] = [ [],[] ];

        this.state.gridStatus.forEach( (item,index) => {
            if( item === 'x' ){
                xCoord.push( Utils.calcCoord(index + 1) );
                xNum.push( index + 1 );
            }
            if( item === 'o' ){
                oCoord.push( Utils.calcCoord(index + 1) );
                oNum.push( index + 1 );
            }
        })
        // 依据一
        let [ xAixsOfX,yAixsOfX,xAixsOfO,yAixsOfO ] = [ [],[],[],[] ];

        xCoord.forEach( (item,index) => {
            xAixsOfX.push( item[ 0 ] );
            yAixsOfX.push( item[ 1 ] );
        })
        oCoord.forEach( (item,index) => {
            xAixsOfO.push( item[ 0 ] );
            yAixsOfO.push( item[ 1 ] );
        })
        if( Utils.arrCheck(xAixsOfX,1) >= 3 || Utils.arrCheck(xAixsOfX,2) >= 3 || Utils.arrCheck(xAixsOfX,3) >= 3 ||
            Utils.arrCheck(yAixsOfX,1) >= 3 || Utils.arrCheck(yAixsOfX,2) >= 3 || Utils.arrCheck(yAixsOfX,3) >= 3 ){
                this.setState({
                    winner:'x'
                },() => {
                    Pubsub.trigger('judgeDone');
                });
                return;
            }
        if( Utils.arrCheck(xAixsOfO,1) >= 3 || Utils.arrCheck(xAixsOfO,2) >= 3 || Utils.arrCheck(xAixsOfO,3) >= 3 ||
            Utils.arrCheck(yAixsOfO,1) >= 3 || Utils.arrCheck(yAixsOfO,2) >= 3 || Utils.arrCheck(yAixsOfO,3) >= 3 ){
                this.setState({
                    winner:'o'
                });
                return;
            }
        // 依据二
        if( (xNum.indexOf(1) !== -1 && xNum.indexOf(5) !== -1 && xNum.indexOf(9) !== -1) 
            || xNum.indexOf(3) !== -1 && xNum.indexOf(5) !== -1 && xNum.indexOf(7) !== -1 ){
            this.setState({
                winner:'x'
            },() => {
                Pubsub.trigger('judgeDone');
            });
            return;
        }
        if( (oNum.indexOf(1) !== -1 && oNum.indexOf(5) !== -1 && oNum.indexOf(9) !== -1) 
            || oNum.indexOf(3) !== -1 && oNum.indexOf(5) !== -1 && oNum.indexOf(7) !== -1 ){
            this.setState({
                winner:'o'
            },() => {
                Pubsub.trigger('judgeDone');
            });
            return;
        }

        if( this.state.gridStatus.indexOf('blank') === -1 ){
            // 平局
            this.setState({
                winner:'draw'
            },() => {
                Pubsub.trigger('judgeDone');
            })
        }
        Pubsub.trigger('judgeDone');
    }
    
    render(){
        let grids = this.state.gridStatus.map( (item,index) => {
            return <Grid key={index.toString()} gridNum={index.toString()} handlePlayerStep={this.handlePlayerStep} gridStatus={item}
                    coordArr={Utils.calcCoord(index + 1)} winner={this.state.winner} />
        });

        return (
            <div className="tictactoe-container">
                <div className="grid-container">
                    {grids}
                </div>
                <Chessbtns winner={this.state.winner} restartChess={this.restartChess}/>
            </div>
        )
    }
}

export default Tictactoe;