import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { connect } from "react-redux";

class ContactData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: "Your name"
                    },
                    value: "",
                    touched: false,
                    validation: {
                        required: true,
                    },
                    valid: false,
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: "Your street"
                    },
                    value: "",
                    touched: false,
                    validation: {
                        required: true,
                    },
                    valid: false,
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: "Your zipCode"
                    },
                    value: "",
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 4,
                        maxLength: 11,

                    },
                    valid: false,
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: "Your country"
                    },
                    value: "",
                    touched: false,
                    validation: {
                        required: true,
                    },
                    valid: false,
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: "Your E-mail"
                    },
                    value: "",
                    touched: false,
                    validation: {
                        required: true,
                    },
                    valid: false,
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        type: 'text',
                        options: [
                            { value: "chepest", displayValue: "Chepest", },
                            { value: "normal", displayValue: "Normal", },
                            { value: "fastest", displayValue: "Fastest", },
                        ]
                    },
                    value: "chepest",
                    valid: true,
                    validation: {},
                    touched: false,
                },
            },
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            },
            formIsValid: true,
        }
    }

    orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token)

    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event, elementID) => {
        const updateOrderForm = { ...this.state.orderForm }
        updateOrderForm[elementID].value = event.target.value
        updateOrderForm[elementID].touched = true
        updateOrderForm[elementID].valid = this.checkValidity(updateOrderForm[elementID].value, updateOrderForm[elementID].validation)

        let formIsValid = true;
        for (let inputIndentfiers in updateOrderForm) {
            formIsValid = (updateOrderForm[inputIndentfiers].valid && formIsValid)
        }
        this.setState({ orderForm: updateOrderForm, formIsValid: formIsValid })
    }

    render() {
        const formElementArray = []
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementArray.map(formElement => {                        
                        return (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        )
                    })
                }
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDistpachToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => { dispatch(actions.purchaseBurger(orderData, token)) }
    }
}

export default connect(mapStateToProps, mapDistpachToProps)(withErrorHandler(ContactData, axios));