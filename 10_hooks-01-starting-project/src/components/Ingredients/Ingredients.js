import React, { useState, useCallback } from "react";
import ErrorModal from "../UI/ErrorModal";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const API_INGREDIENTS =
    "https://todoingredients.firebaseio.com/todoingredients";

const Ingredients = () => {
    const [userIngredients, setUserIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const addIngredientHandler = (ingredient) => {
        if (!ingredient.title) {
            setError("Add alguma informação");
        } else {
            setIsLoading(true);
            fetch(API_INGREDIENTS, {
                method: "POST",
                body: JSON.stringify(ingredient),
                headers: { "Content-type": "application/json" },
            })
                .then((response) => {
                    setIsLoading(false);
                    return response.json();
                })
                .then((responseData) => {
                    setUserIngredients((prevIngrendients) => [
                        ...prevIngrendients,
                        { id: responseData.name, ...ingredient },
                    ]);
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    };

    const removeIngredientHandler = (id) => {
        setIsLoading(true);
        fetch(`${API_INGREDIENTS}/${id}.json`, {
            method: "DELETE",
        })
            .then((response) => {
                setIsLoading(false);
                setUserIngredients((prevIngrendients) => {
                    return prevIngrendients.filter((ing) => ing.id !== id);
                });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const filteredIngredientsHandler = useCallback((filteredIngredients) => {
        setUserIngredients(filteredIngredients);
    }, []);

    const clearError = () => {
        setError(null);
    };

    return (
        <div className="App">
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
            <IngredientForm
                onAddIngredients={addIngredientHandler}
                loading={isLoading}
            />
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
