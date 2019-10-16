import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  
    render (){
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return (
                    <li key={ingKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingKey}: </span>
                        {this.props.ingredients[ingKey]}
                    </li>
                )
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicius burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>
                    <strong>
                        Total price: {this.props.price.toFixed(2)}
                    </strong>
                </p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseCancel}  btnType={'Danger'}>Cancel</Button>
                <Button clicked={this.props.purchaseContinue}  btnType={'Success'}>Continue</Button>
            </Aux>
        )
}
}
export default OrderSummary;