import React, { PureComponent } from "react";
import Person from "./Person/Person";

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps')
    //     return state;
    // }

    getSnapshotBeforeUpdate(prevProps, nextState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate')

    }
    componentDidUpdate(prevProps, nextState) {
        console.log('[Persons.js] componentDidUpdate')

    }
    
    render() {
        console.log('[Persons.js] rendering...');
        return this.props.persons.map((person, index) => {
            return (
                <Person
                    click={() => this.props.click(index)}
                    name={person.name}
                    key={person.id}
                    age={person.age}
                    changed={(event) => this.props.changed(event, person.id)}
                    isAuth={this.props.isAuthenticated}
                />
            );
        });
    }
}

export default Persons;