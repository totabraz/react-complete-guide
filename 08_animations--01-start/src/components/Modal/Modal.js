import React from 'react';
import './Modal.css';
import { CSSTransition } from "react-transition-group";


const animationTime = {
    enter: 400,
    exit: 400
}
const modal = (props) => {
    console.log('props.show', props.show)
    return (
        <CSSTransition
            in={props.show}
            timeout={animationTime}
            mountOnEnter
            unmountOnExit

            classNames={'fade-side'}
        >
            {() => (
                <div className="Modal">
                    <h1>A Modal</h1>
                    <button className="Button" onClick={props.closed}>Dismiss</button>
                </div>
            )
            }
        </CSSTransition>
    )
}

export default modal;