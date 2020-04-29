import React, { useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const API_ING = "https://todoingredients.firebaseio.com/todoingredients.json";

const Ingredients = () => {
    const [userIngredients, setUserIngredients] = useState([]);
    /**
	 *
	 
    useEffect(() => {
        fetch(API_ING)
            .then((response) => response.json())
            .then((responseData) => {
                const ingredients = Object.keys(responseData).map((key) => ({
                    id: key,
                    title: responseData[key].title,
                    amount: responseData[key].amount,
                }));
                setUserIngredients(ingredients);
            });
    }, []);
    // Using [] as second parametr
    // it's act as componentDidMount,
	// running one time once
	
	 */

    const addIngredientHandler = (ingredient) => {
        fetch(API_ING, {
            method: "POST",
            body: JSON.stringify(ingredient),
            headers: { "Content-type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);

                setUserIngredients((prevIngrendients) => [
                    ...prevIngrendients,
                    { id: responseData.name, ...ingredient },
                ]);
            });
    };

    const removeIngredientHandler = (id) => {
        fetch(
            `https://todoingredients.firebaseio.com/todoingredients/${id}.json`,
            {
                method: "DELETE",
            }
        ).then((response) => {
            setUserIngredients((prevIngrendients) => {
                return prevIngrendients.filter((ing) => ing.id !== id);
            });
        });
    };

    const filteredIngredientsHandler = useCallback((filteredIngredients) => {
        setUserIngredients(filteredIngredients);
    }, []);

    return (
        <div className="App">
            <IngredientForm onAddIngredients={addIngredientHandler} />
            <section>
                <Search onLoadIngredients={filteredIngredientsHandler} />
                <IngredientList
                    onRemoveItem={removeIngredientHandler}
                    ingredients={userIngredients}
                />
            </section>
        </div>
    );
};

export default Ingredients;
