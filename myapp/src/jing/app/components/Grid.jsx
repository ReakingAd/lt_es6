import React,{Component} from 'react';

class Grid extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        if( this.props.winner ){
            return;
        }
        let gridStatus = this.props.gridStatus;

        if( gridStatus === 'blank' ){
            this.props.handlePlayerStep(this.props.coordArr);
        }
    }
    render(){
        let chessMap = {
            blank:'',
            x:'x',
            o:'o'
        }
        let chess = chessMap[ this.props.gridStatus ];
        
        return (
            <div className="grid" onClick={this.handleClick}>
                { chess }
            </div>
        )
    }
}

export default Grid;