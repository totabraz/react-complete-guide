import React, { Component } from 'react';

import './AddPerson.css';
import { runInThisContext } from 'vm';

class AddPerson extends Component {
    state = {
        name: '',
        age: '',
    }

    nomeChangedHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    ageChangedHandler = (event) => {
        this.setState({ age: event.target.value })
    }
    render() {
        return (
            <div className="AddPerson">
                <input type="text" placeholder="name" onChange={this.nomeChangedHandler} value={this.state.name} />
                <input type="number" placeholder="age" onChange={this.ageChangedHandler} value={this.state.age} />
                {/**
                 * <AddPerson personAdded={this.props.onAddedPerson} />
                 * in this case:
                 * this.props.personAdded is the sabem of onAddedPerson function
                 * 
                 */}
                <button onClick={() => this.props.personAdded(this.state.name,this.state.age)}>Add Person</button>
            </div>
        )
    }
}
export default AddPerson;