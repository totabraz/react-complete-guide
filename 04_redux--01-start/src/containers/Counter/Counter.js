import React, { Component } from 'react';
import { connect } from 'react-redux'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionType from '../../store/actions'

class Counter extends Component {
    state = {
        counter: 0,
        results: [],
    }

    // counterChangedHandler = ( action, value ) => {
    //     switch ( action ) {
    //         case 'inc':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
    //             break;
    //         case 'dec':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
    //             break;
    //         case 'add':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
    //             break;
    //         case 'sub':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
    //             break;
    //     }
    // }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store Result</button>
                <ul>

                    {
                            this.props.results.map(resultsKey => {
                                console.log(resultsKey)
                                return(
                                
                                <li key={resultsKey.id} onClick={() => this.props.onDeleteResult(resultsKey.id)}>{resultsKey.value}</li>
                            )
                        })
                    }

                </ul>
            </div>
        );
    }
}

// mapStateToProps -> slice the hole state. 
// so you can filter what do you needs to store..
const mapStateToProps = state => {
    console.log(state.res.results)
    return {
        counter: state.ctr.counter,
        results: state.res.results,
    }
}

// a helper function that call store.dispatch behind the scenes as parameter
// and you can use it on your class as a props:
//  this.props. ... as: this.props.onIncrementCounter
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actionType.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionType.DECREMENT }),
        onAddCounter: () => dispatch({ type: actionType.ADD, value: 5 }),
        onSubtractCounter: () => dispatch({ type: actionType.SUBTRACT, value: 5 }),
        onStoreResult: (result) => dispatch({ type: actionType.STORE_RESULT, result:result} ),
        onDeleteResult: (id) => dispatch({ type: actionType.DELETE_RESULT, resultElmentID: id}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);