import React, { Component } from 'react';
import classes from "./Person.module.css";
import WithClass from './../../../hoc/WithClass';
import Aux from './../../../hoc/Aux';

class Person extends Component {
    render(){
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                <p onClick={this.props.click}>Hi, I'm {this.props.name}, {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </Aux>
        );
    
    }
}

export default WithClass(Person, classes.Person);