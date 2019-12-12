import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import { connect } from 'react-redux'
import * as actionType from '../../store/actions/actionTypes'

class BurgerBuilder extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false,
            error: null
        }
    }

    componentDidMount = () => {
        // axios.get('https://react-my-burger-cc06d.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //         const sum = Object.keys(response.data)
        //             .map(respKey => {
        //                 return response.data[respKey]
        //             })
        //             .reduce((sum, el) => {
        //                 return sum + el
        //             }, 0)
        //         this.setState({purchaseable: sum > 0})
        //     })
        //     .catch( error =>{
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push({ pathname: "/checkout" })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        }
        console.log(this.props.ings)
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null

        if (this.state.loading) orderSummary = <Spinner />

        let burger = (this.state.error) ? <p>ingredients can't be loaded</p> : <Spinner />

        if (this.props.ings) {
            orderSummary = <OrderSummary
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />
            burger = <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    price={this.props.price}
                    ingredientsAdded={this.props.onIngredientAdd}
                    ingredientsRemoved={this.props.onIngredientRemove}
                    disabled={disableInfo}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemove: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));