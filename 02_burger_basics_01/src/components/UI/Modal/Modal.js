import React, { Component } from 'react';
import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    // Better performace
    // don't expend time rendering if not update
    shouldComponentUpdate(nextProp, nextState)  {
        return  ((nextProp.show !== this.props.show) || (nextProp.children !== this.props.children)) ;
    }

    componentDidUpdate(){
    }

    render () {
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style={{
                    transform: this.props.show? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal