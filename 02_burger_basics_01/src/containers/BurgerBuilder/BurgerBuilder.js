import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


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
    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }


        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchaseable={this.state.purchaseable}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;