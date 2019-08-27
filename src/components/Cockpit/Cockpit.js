/**
 * Cockpit meaning
 * 1.a compartment for the pilot, and sometimes also the crew, in an aircraft or spacecraft.
 * 2.a place where cockfights are held.
 */

import React , { useEffect }from 'react';
import classes from './cockpit.module.css';

const Cockpit = (props) => {

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // or a HTTP request for example..
        setTimeout(() => {
            alert('Tete');
        }, 1000);
    }, []);


    const assignedClasses = [];
    let btnClass = '';    
    if (props.showPerson) {
        btnClass = classes.Red;
    }
    if (props.persons.length <= 2 ){
        assignedClasses.push( classes.red );
    } 
    if (props.persons.length <= 1 ){
        assignedClasses.push( classes.bold );
    } 

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')} >And this is a subtitle</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Switch Names</button> 
        </div>
    );
}


export default Cockpit;