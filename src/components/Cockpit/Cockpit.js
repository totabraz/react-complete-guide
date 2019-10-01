/**
 * Cockpit meaning
 * 1.a compartment for the pilot, and sometimes also the crew, in an aircraft or spacecraft.
 * 2.a place where cockfights are held.
 */

import React, { useEffect, useRef } from 'react';
import classes from './cockpit.module.css';
import authContext from "../../context/auth-context";

const Cockpit = (props) => {

    const toggleBtnRef = useRef(null);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // or a HTTP request for example..
        const timer = setTimeout(() => {
            // alert('Tete');
        }, 1000);
        toggleBtnRef.current.click();
        // It runs BEFORE the main useEffect function runs, but AFTER the (first) erender cycle
        return () => {
            clearTimeout(timer);
            console.log('[Cockpit.js] cleanup work in  useEffect');
        }
    }, []);
    // to change every moment a the stae of persons change
    // }, [props.persons]);
    // and you can change for many conditions
    // }, [props.persons, a, b , ...]);

    useEffect(() => {
        console.log('[Cockpit.js 2nd] useEffect');
        return () => {
            console.log('[Cockpit.js 2nd] cleanup work in  useEffect');

        };
    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPerson) {
        btnClass = classes.Red;
    }
    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')} >And this is a subtitle</p>
            <button
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}>Switch Names</button>
            <authContext.Consumer>
                {context => <button onClick={context.login}>Log In</button>}
            </authContext.Consumer>
        </div>
    );
}

/// Memo -> not update component every moment. 
// React.memo(...) is a great way to optimization functions components , and wrap to may not update it every moment
export default React.memo(Cockpit);