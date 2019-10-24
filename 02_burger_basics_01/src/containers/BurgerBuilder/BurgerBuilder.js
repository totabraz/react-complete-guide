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
            ingredients:  null,
            totalPrice: 4,
            purchaseable: false,
            purchasing: false,
            loading: false,
            error: null
        }
    }

    componentDidMount  = ( ) => {
        axios.get('https://react-my-burger-cc06d.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
                const sum = Object.keys(response.data)
                    .map(respKey => {
                        return response.data[respKey]
                    })
                    .reduce((sum, el) => {
                        return sum + el
                    }, 0)
                this.setState({purchaseable: sum > 0})
            })
            .catch( error =>{
                this.setState({error: true})
            })
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
        console.log(this.props)
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: "/checkout",
            search: queryString,
        })

    }
    
    purchaseHandler = () => {
        this.setState({purchasing:true})
    }
    
    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        console.log(this.state.ingredients)
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary =  null

        if (this.state.loading) orderSummary = <Spinner/>

        let  burger = (this.state.error)? <p>ingredients can't be loaded</p> : <Spinner/> 

        if (this.state.ingredients){
            orderSummary =  <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>
            burger =<Aux>
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

export default withErrorHandler (BurgerBuilder, axios);