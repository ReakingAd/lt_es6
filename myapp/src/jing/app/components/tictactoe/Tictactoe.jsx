import React,{ Component } from 'react';
import Grid from './Grid.jsx';
import Utils from './Utils.js';
import Chessbtns from './Chessbtns.jsx';
import Gameinfo from './Gameinfo.jsx';
// const serverAddr = 'http://localhost:8082';
const serverAddr = 'http://es6.reakingad.com:8082';

class Tictactoe extends Component{
    constructor(props){
        super(props);
        this.initSocket   = this.initSocket.bind(this);
        this.stepClient   = this.stepClient.bind(this);
        this.judgeResult  = this.judgeResult.bind(this);
        this.restartChess = this.restartChess.bind(this);
        this.isMyTurn     = this.isMyTurn.bind(this);
        this.state = {
            gridStatus:['blank','blank','blank','blank','blank','blank','blank','blank','blank'],
            winner:'',
            waitingFor:'x',
            role:this.getRole()
        }
        this.initSocket();
    }
    getRole(){
        let queryString = window.location.search;
        let paramsMap   = Utils.formatQuerystring( queryString );
        let role        = paramsMap.get('player');

        return role;
    }
    getOtherRole(role){
        if( typeof role !== 'string' ){
            return role;
        }
        if( role === 'x' ){
            return 'o'
        }
        if( role === 'o' ){
            return 'x';
        }
        return role;
    }
    // 初始化socket.io。监听服务器推送
    initSocket(){
        this.socket = io(serverAddr);
        // 接收落子信息
        this.socket.on('stepServer',msg => {
            this.updateChess(msg)
        });
        // 接收重新开始的指令
        this.socket.on('restartGameServer',() => {
            this.setState({
                gridStatus:['blank','blank','blank','blank','blank','blank','blank','blank','blank'],
                winner:'',
                waitingFor:'x',
                role:this.getRole()
            })
        })
    }
    // 重新开始游戏
    restartChess(){
        this.socket.emit('restartGameClient');
    }
    // 玩家落子后，将落子信息发送服务器
    stepClient(clickedKey){
        this.socket.emit('stepClient',{
            player:this.state.role,
            axis:clickedKey
        })
    }
    // 更新棋盘中棋子的状态
    updateChess(step){
        let {player,axis} = step;
        let _num = Utils.calcNum(axis);

        this.state.gridStatus[ _num - 1 ] = player;
        this.setState({
            gridStatus:this.state.gridStatus,
            waitingFor:this.getOtherRole(player)
        },this.judgeResult)
    }
    /**
     * @desc 判断胜负结果。
     *          判断依据一（直线）：将x和o的棋子所在横纵坐标分别放入不同数组，当某个值在数组中出现3次时，表名连成了横线或竖线。则当前棋子方获胜
     *          判断依据二（斜线）：穷举
     */
    judgeResult(){
        let [ xCoord,oCoord ] = [ [],[] ];
        let [ xNum,oNum ]     = [ [],[] ];

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
            });
            return;
        }
        if( (oNum.indexOf(1) !== -1 && oNum.indexOf(5) !== -1 && oNum.indexOf(9) !== -1) 
            || oNum.indexOf(3) !== -1 && oNum.indexOf(5) !== -1 && oNum.indexOf(7) !== -1 ){
            this.setState({
                winner:'o'
            });
            return;
        }

        if( this.state.gridStatus.indexOf('blank') === -1 ){
            // 平局
            this.setState({
                winner:'draw'
            })
        }
    }
    // 计算是否轮到当前页面的角色落子
    isMyTurn(){
        let isMyTurn   = false;
        let role       = this.state.role;
        let waitingFor = this.state.waitingFor;

        if( role === waitingFor ){
            isMyTurn = true;
        }
        return isMyTurn;
    }
    render(){
        let isMyTurn = this.isMyTurn();
        let grids = this.state.gridStatus.map( (item,index) => {
            return <Grid key={index.toString()} gridNum={index.toString()} stepClient={this.stepClient} gridStatus={item}
                        coordArr={Utils.calcCoord(index + 1)} winner={this.state.winner} isMyTurn={isMyTurn} />
        });

        return (
            <div className="tictactoe-container">
                <div className="game-container">
                    <Gameinfo isMyTurn={isMyTurn} role={this.state.role} winner={this.state.winner}
                        getOtherRole={this.getOtherRole} />
                    <div className="grid-container">
                        {grids}
                    </div>
                    <Chessbtns restartChess={this.restartChess}  getOtherRole={this.getOtherRole} />
                </div>
            </div>
        )
    }
}

export default Tictactoe;