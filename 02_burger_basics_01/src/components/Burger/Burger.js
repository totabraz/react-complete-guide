import React from 'react';

import classes from './burger.module.css'
import BurgerIngredients from './BurgerIngredients';


const burger = (props) => {
    return(
        <div className={classes.burger}>
            <BurgerIngredients type="bread-top"/>
            <BurgerIngredients type="meat"/>
            <BurgerIngredients type="cheese"/>
            <BurgerIngredients type="bacon"/>
            <BurgerIngredients type="salad"/>
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default burger;