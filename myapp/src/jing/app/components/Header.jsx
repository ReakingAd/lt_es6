import React,{Component} from 'react';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:this.props.name
        }
    }
    handler(){
        console.log('111');
    }
    render(){
        return (
            <div>
                <h1>{this.state.name}</h1>
                <div>
                    <button onClick={this.handler.bind(this)}>click</button>
                </div>
            </div>
        )
    }
}

export default Header;