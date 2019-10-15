import React from 'react';

import classes from './burger.module.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';


const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredKey => {
            // (_, i ) -> using "_" is the same to say: blanks name..
            return [...Array(props.ingredients[ingredKey])].map((_, i ) => {
                return <BurgerIngredient key={ingredKey + i} type={ingredKey}/> 
            });
        })
        .reduce((previusValue, el) => {
            return previusValue.concat(el)
        }, []);
        // reduce allows to transform a array in something else.abs
        // retrun {... return} or the default '[]'

    if (transformedIngredients.length === 0) {
        transformedIngredients= <p>Please, start adding some ingredients!</p>
    }

    return(
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top"/>
            {/* <BurgerIngredient type="meat"/>
            <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="bacon"/>
            <BurgerIngredient type="salad"/>
            */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/> 
        </div>
    );
}

export default burger;