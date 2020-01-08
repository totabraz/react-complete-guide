import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from "react-redux";

class Checkout extends Component {

    componentWillMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for (let param of query.entries()) {
            // ['salad', 1]
            if (param[0] === 'price') this.setState({ price: param[1] })
            else ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients: ingredients })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null
            console.log(purchaseRedirect)
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        CheckoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return (
            <div>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout)