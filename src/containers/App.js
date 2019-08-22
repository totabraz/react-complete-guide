import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import { tsMethodSignature } from '@babel/types';

class App extends Component {
    state = {
        persons : [
            { id:"id1", name: "João", age:28 },
            { id:"id2", name: "Juliana", age:23 },
            { id:"id13", name: "Maria", age:24 }
        ],
        someOtherstate: "lalalala",
        showPersons: false
    }
    
    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id
        })
        
        const persons = [...this.state.persons];
        const person = { ...this.state.persons[personIndex] };
        person.name = event.target.value;
        
        persons[personIndex] = person;
        console.log(person);
        
        this.setState({ persons : persons });
    }

    togglePersonsHandler = () => {
        const status = this.state.showPersons;;
        this.setState({showPersons : !status });
    }
    
    deletePersonHandler = (personIndex) => {
        const person = [...this.state.persons];;
        person.splice(personIndex, 1)
        this.setState ({ persons : person})
    }
    
    render() {
        let persons = null;
        if (this.state.showPersons) {
            persons = <Persons 
                persons={this.state.persons}
                click={this.deletePersonHandler}
                changed={this.nameChangedHandler}/>;   
        }
       
        return ( 
            <div className={classes.App}>
                <Cockpit
                    title={this.props.appTitle}
                    clicked={this.togglePersonsHandler}
                    showPersons={true}
                    persons={this.state.persons}/>
                {persons}
            </div> 
        );
    }
}

export default App;


