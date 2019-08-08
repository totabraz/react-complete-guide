import React, { Component } from 'react';
import classes from './App.module.css';
import Person from './components/Person/Person';

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

        const style = {
            backgroundColor: "green",
            font:  'inherit',
            border: "1px solid blue",
            padding: '8px',
            cursor: "pointer",
        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            key={person.id}
                            age={person.age}
                            changed={(event) => this.nameChangedHandler(event, person.id)} />
                    })}
                </div>
            );
            style.backgroundColor = 'red';
        }
        const assignedClasses = [];
        if (this.state.persons.length <= 2 ){
            assignedClasses.push( classes.red );
        } 
        if (this.state.persons.length <= 1 ){
            assignedClasses.push( classes.bold );
        } 

        return ( 
            <div className={classes.App}>
                <h1>Hi, I'm a React App</h1>
                <p className={assignedClasses.join(' ')} >And this is a subtitle</p>
                <button style={style} onClick={this.togglePersonsHandler}>Switch Names</button>    
                {persons}
            </div>
        );
    }
}

export default App;


