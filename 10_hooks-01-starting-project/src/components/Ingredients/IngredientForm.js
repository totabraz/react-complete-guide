import React, { useState } from "react";
import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo((props) => {
    // #IMPORTANT# -------- START ------------- #IMPORTANT#
    // Things about useState()
    // - You HAVE TO use it in a function component body!
    // - You HAVE TO on the root component.
    // - You CAN`T use inside a conditions
    // #IMPORTANT# --------- END ------------- #IMPORTANT#
    // the params is the default state, cam be a array, object, boolean.
    // but in Class component, HAVE TO BE a object.
    const [inputTitle, setInputTitle] = useState("");
    const [inputAmount, setInputAmount] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAddIngredients({
            title: inputTitle,
            amount: inputAmount,
        });
    };

    return (
        <section className="ingredient-form">
            <Card>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            id="title"
                            value={inputTitle}
                            onChange={(event) =>
                                setInputTitle(event.target.value)
                            }
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={inputAmount}
                            onChange={(event) =>
                                setInputAmount(event.target.value)
                            }
                        />
                    </div>
                    <div className="ingredient-form__actions">
                        <button type="submit">Add Ingredient</button>
                        {props.loading && <LoadingIndicator />}
                    </div>
                </form>
            </Card>
        </section>
    );
});

export default IngredientForm;
