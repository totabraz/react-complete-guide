import React from 'react';

import Aux from '../../../hoc/Aux'

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}: </span>
                    {props.ingredients[ingKey]}
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
            <p>Continue to checkout?</p>
        </Aux>
    )

}
export default OrderSummary;