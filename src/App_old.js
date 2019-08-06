import React, { useState } from 'react';
import './App.css';
import Person from './components/Person/Person';

const App = props => {
    const [otherState, setOtherState] = useState("some other value");
    const [personsState, setPersonsState] = useState({
        persons : [
            { name: "Max", age:28 },
            { name: "Manu", age:23 },
            { name: "Maria", age:24 }
        ]
    });
    
    console.log(personsState, otherState);

    const switchNamedPerson = (newName = " ") => {
        setPersonsState({
            persons :[
                { name: newName, age:22 },
                { name: "Manu", age:23 },
                { name: "Maria", age:28 }
            ]
        })
    }

    return ( 
    <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>And this is a subtitle</p>
        <button onClick={() => switchNamedPerson("Maxmilian!!")}>Switch Names</button>
        <Person
            name={personsState.persons[0].name}
            age={personsState.persons[0].age}
            click={switchNamedPerson.bind(this,"Max2")}/>
        <Person
            name={personsState.persons[1].name}
            age={personsState.persons[1].age}/>
        <Person
            name={personsState.persons[2].name}
            age={personsState.persons[2].age}
            click={switchNamedPerson.bind(this,"Maxmilian")}>
            Children informations
        </Person>
    </div>
    );
}

export default App;


