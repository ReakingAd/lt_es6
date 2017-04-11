import React,{Component} from 'react';
import BoilingVerdict from './boilingVerdict.jsx';

class Calculator extends Component{
    constructor(props){
        super(props);
        this.state = {
            temperature:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(e){
        this.setState({
            temperature:e.target.value
        })
    }
    handleClick(){
        console.log('click');
        this.props.onParentHandleClick('xxx');
    }
    render(){
        return (
            <fieldset>
                <legend>Enter temperature in Celsius:</legend>
                <input 
                    value={this.state.temperature}
                    onChange={this.handleChange} />
                <BoilingVerdict temperature={parseInt(this.state.temperature)} />
                <button onClick={this.handleClick}>click me!</button>
            </fieldset>
        )
    }
}
export default Calculator;