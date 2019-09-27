import React, { Component } from 'react';
import classes from "./Person.module.css";
import WithClass from './../../../hoc/WithClass';
import Aux from './../../../hoc/Aux';
import PropTypes from 'prop-type';

class Person extends Component {
    render(){
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                <p key="info1" onClick={this.props.click}> Hi, I'm {this.props.name},{this.props.age} years old.</p>
                <p key="info2">{this.props.children}</p>
                <input
                    key="info3"
                    type="text"
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
    changed: PropTypes.func
}

export default WithClass(Person, classes.Person);