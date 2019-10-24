import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes welll!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button btnType="Danger" clicked={props.CheckoutCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;