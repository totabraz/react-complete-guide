import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        constructor(props){
            super(props)
            this.state = {
                error: null
            }
        }

        componentDidMount() {
           this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
                console.log(error)
                return Promise.reject(error);            
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render (){
            return (
                <Aux>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : ''}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}


export default withErrorHandler;