import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            address: {
                street:'',
                postalCode: ''
            },
            loading:false,
             
            }
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'tota',
                address: {
                    street: "sasdokasod",
                    zipCode: '999999',
                    country: "Brazil",                    
                },
                email: 'email@email.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then( response => {
                console.log(response)
                this.setState({
                    loading: false,
                })
            })
            .catch( error => {
                console.log(error)
                this.setState({
                    loading: false,
                })
            });
    }

    render() {
        let form =  ( 
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Type your name"/>
                <input className={classes.Input} type="text" name="email" placeholder="Type your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Type your street"/>
                <input className={classes.Input} type="text" name="postalCode" placeholder="Type your postalCode"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData }>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;