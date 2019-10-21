import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICES = {
    salad: 0.25,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.5,
}
class BurgerBuilder extends Component {
    state = {};
    constructor(props){
        super(props);
        this.state = {  
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4,
            purchaseable: false,
            purchasing: false,
            loading: false,
        }
    }

    updatePurchaseable(ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
            this.setState({purchaseable: sum>0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updateIngredients ={
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCounted;
        
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ingredients:updateIngredients, totalPrice: newPrice});
        this.updatePurchaseable(updateIngredients);

    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount>0){
            const updateCounted = oldCount - 1;
            const updateIngredients ={
                ...this.state.ingredients
            };
            updateIngredients[type] = updateCounted;
            
            const priceDeduction = INGREDIENTS_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + priceDeduction;

            this.setState({ingredients:updateIngredients, totalPrice: newPrice});
            this.updatePurchaseable(updateIngredients);
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    
    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'tota',
                address: {
                    street: "sasdokasod",
                    zipCode: '999999',
                    country: "Brazil",                    
                },
                email: 'email@email.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then( response => {
                console.log(response)
                this.setState({
                    loading: false,
                    purchasing: false,
                })
            })
            .catch( error => {
                console.log(error)
                this.setState({
                    loading: false,
                    purchasing: false,
                })
            });
    }
    
    purchaseHandler = () => {
        this.setState({purchasing:true})
    }
    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary =  <OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            />
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                   {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    />
            </Aux>
        );
    }
}

export default withErrorHandler (BurgerBuilder, axios);