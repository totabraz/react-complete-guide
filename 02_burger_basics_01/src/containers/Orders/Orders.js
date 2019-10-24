import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    constructor(props){
        super(props)
        this.state = {
            orders:[],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(resp =>  {
                this.setState({loading: false})
                console.log(resp.data)
                const fetchOrders = []
                for (let key in resp.data) {
                    fetchOrders.push({
                        ...resp.data[key],
                        id:key})
                }
                this.setState({loading:false, orders: fetchOrders})
                console.log(this.state.orders)
            })
            .catch( err => {
                this.setState({loading: false})                
            })
    }
    render(){
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        price={order.price}
                        ingredients={order.ingredients}
                        key={order.id}/>
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);