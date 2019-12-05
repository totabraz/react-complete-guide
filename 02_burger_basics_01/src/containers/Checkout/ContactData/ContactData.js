import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
            loading: false,

        }
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true });
        const formData = {}
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderDAta: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({
                    loading: false,
                })
            });
    }

    checkValidity(value, rule) {
        let isValid = true
        if (!rule) {
            if (rule.required) isValid = value.trim() !== '' && isValid
            if (rule.minLength) isValid = value.length >= rule.minLength && isValid
            if (rule.maxLength) isValid = value.length <= rule.maxLength && isValid
        }
        return isValid
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
        if (this.state.loading) {
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
        ings: state.ingredients,
        price: state.totalPrice

    }
}

export default connect(mapStateToProps)(ContactData);