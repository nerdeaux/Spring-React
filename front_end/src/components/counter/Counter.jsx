import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class Counter extends Component {
    constructor() {
        super();

        this.state = {
            counter: 0,
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return ( 
            <div>
                <div className = "flex-counter">
                    <span>
                        <h2>COUNTER</h2>
                    </span>
                    <CounterButton  incrementMethod={this.increment} decrementMethod={this.decrement}/>
                    <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                    <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                    <span className="count">{this.state.counter}</span>
                    <button id='countButtons' className="reset" onClick={this.reset}>Reset</button>
                </div>
            </div>
        );
    }

    increment(by) { // Update the state
        this.setState(
            (prevState) => {
                return {counter: prevState.counter + by}
            }
        );
    }

    decrement(by) {
        this.setState(
            (prevState) => {
                return {counter: prevState.counter - by}
            }
        )
    }

    reset() {
        this.setState(
            {counter: 0}
        )
    }
}
 

class CounterButton extends Component {
   
    render() {
       // render = () => {}
        return (
            //<div className="flex-counter">
                <span>
                    <button id='countButtons' onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                    <button id='countButtons' onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
                </span>
            //</div>
        )
    }

}

CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by: PropTypes.number
}

export default Counter;