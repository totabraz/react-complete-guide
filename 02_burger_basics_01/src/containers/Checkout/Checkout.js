import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import CotntactData from './ContactData/ContactData'
class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ingredients:{
                ingredients: null,
                price: 0
            }
        }
    }

    componentWillMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for (let param of query.entries()){
            // ['salad', 1]
            if(param[0] === 'price') this.setState({price: param[1]})
            else ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients})
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary
                ingredients={this.state.ingredients}
                CheckoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={ (props) => <CotntactData 
                            {...props}
                            price={this.state.price}
                            ingredients={this.state.ingredients}/>
                    }/> 
            </div>
        )
    }
}

export default Checkout