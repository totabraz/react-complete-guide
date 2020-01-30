import React from 'react'
import classes from './PizzaImage.module.scss'
import PizzaImage from "../assets/img/pizza.png";

const pizzaImage = (props) => {
    <div className={classes.Pizza}>
        <img src={PizzaImage} className={classes.PizzaImg} />
    </div>
}

export default pizzaImage