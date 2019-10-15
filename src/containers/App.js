import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Aux';

class App extends Component {
    constructor (props){ 
        super (props);
        console.log('[App.JS] Constructor' + props)
    }

    state = {
        persons : [
            { id:"id1", name: "João", age:28 },
            { id:"id2", name: "Juliana", age:'23' },
            { id:"id13", name: "Maria", age:24 }
        ],
        someOtherstate: "lalalala",
        showPersons: false,
        showCockpit: true,
        changeCounter: 0
    }
    
    static getDerivedStateFromProps(props, state) {
        console.log('[App.JS] getDerivedStateFromProps', props);
        return state;
    }

    componentWillount() {
        console.log('[App.JS] componentWillount');
    }


    componentDidMount() {
        console.log('[App.JS] componentDidMount');
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
        
        this.setState((prevState, prpps) => { 
            return {
                persons : persons,
                changeCounter: prevState.changeCounter + 1
            }
        });
    }

    togglePersonsHandler = () => {
        const status = this.state.showPersons;
        this.setState({showPersons:!status});
    }
    
    deletePersonHandler = (personIndex) => {
        const person = [...this.state.persons];
        person.splice(personIndex, 1)
        this.setState ({ persons : person})
    }
    
    render() {
        console.log('[App.js] render');
        let persons = null;
        if (this.state.showPersons) {
            persons = <Persons 
                persons={this.state.persons}
                click={this.deletePersonHandler}
                changed={this.nameChangedHandler}/>;   
        }
       
        return ( 
            <Aux classes={classes.App}>
                <button onClick={() => {
                    this.setState({ showCockpit: false}); 
                    }} >
                        Remove Cockpit
                        </button>
                {this.state.showCockpit ?
                    <Cockpit
                        title={this.props.appTitle}
                        clicked={this.togglePersonsHandler}
                        showPersons={true}
                        personsLenght={this.state.persons.lenght}/>
                    : null }
                {persons}
            </Aux> 
        );
    }
}

export default withClass(App, classes.App);


