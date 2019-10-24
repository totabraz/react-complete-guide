import React from 'react';
import classes from './Order.module.css'


const order = (props) => {

    const ingredients = []
    for (let ingredientsName in props.ingredients){
        ingredients.push({
            name: ingredientsName,
            amount: props.ingredients[ingredientsName]
        })
    }
    const ingredientsOutput = ingredients.map(ingKey =>{
        // name_ingredient (000)
        return <span 
            style={{
                textTransform: "capitalize",
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px',
            }}
            key={ingKey.name}>
            {ingKey.name} ({ingKey.amount})
        </span>
    })
    return <div className={classes.Order}>
        <p>Ingredientes: {ingredientsOutput}</p>
        <p>Price: <strong>R${Number.parseFloat(props.price).toFixed(2)}</strong></p>

    </div>
    }


export default order;