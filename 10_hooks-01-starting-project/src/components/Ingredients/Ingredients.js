import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngrendients => [
      ...prevIngrendients,
      { id: Math.random().toString(), ...ingredient }
    ]);
  };

  const removeIngredientHandler = id => {
    setUserIngredients(prevIngrendients => {
      return prevIngrendients.filter(ing => ing.id !== id);
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredients={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList
          onRemoveItem={removeIngredientHandler}
          ingredients={userIngredients}
        />
      </section>
    </div>
  );
}

export default Ingredients;
