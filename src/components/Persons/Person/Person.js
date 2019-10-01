import React, { Component } from 'react';
import classes from "./Person.module.css";
import WithClass from './../../../hoc/WithClass';
import Aux from './../../../hoc/Aux';
import PropTypes from 'prop-types';
import Person from '../../Persons/Person';
import authContext from '../../../context/auth-context';

class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        // this.inputElement.focus()
        this.inputElementRef.current.focus();
    }
    render() {
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                <authContext.Consumer>
                    {(context) => {
                        context.authenticated ?  <p> Authenticated!</p> : <p>Please log in!</p>}
                    }}

                </authContext.Consumer>

                
                <p key="info1" onClick={this.props.click}>
                    Hi, I'm {this.props.name},{this.props.age} years old.
                     </p>
                <p key="info2">{this.props.children}</p>
                <input
                    key="info3"
                    type="text"
                    // ref={ (inputEl) => {this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        );

    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
}

export default WithClass(Person, classes.Person);